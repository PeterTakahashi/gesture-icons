import { createElement, useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import type { GestureHandle } from '../lib/core/useGesture'
import type { GestureIconProps } from '../lib/core/types'
import './styles.css'

// ── auto-registry ──────────────────────────────────────────────────────────
// Every icon file exports `meta` + a default component; the demo discovers
// them all here. Adding an icon = adding a file. アイコン追加＝ファイル追加。
interface IconMeta {
  name: string
  gesture: string
  family: string
  section: string
  tags: string[]
}
interface IconModule {
  default: ComponentType<GestureIconProps>
  meta: IconMeta
}
const modules = import.meta.glob('../lib/icons/*.tsx', { eager: true }) as Record<string, IconModule>
// Sources load lazily — with 500 icons, inlining them all would bloat the bundle.
const sourceLoaders = import.meta.glob('../lib/icons/*.tsx', { query: '?raw', import: 'default' }) as Record<string, () => Promise<string>>

interface Entry extends IconMeta {
  Icon: ComponentType<GestureIconProps>
  path: string
}

const ALL: Entry[] = Object.entries(modules)
  .filter(([, m]) => m.meta && m.default)
  .map(([path, m]) => ({ ...m.meta, Icon: m.default, path }))
  .sort((a, b) => a.name.localeCompare(b.name))

const SECTION_ORDER = [
  'Hands', 'Interface', 'Arrows', 'Objects', 'Communication', 'Media', 'Workspace',
  'Files & time', 'Data', 'Text & editing', 'Devices', 'Security', 'Charts & math',
  'Money & commerce', 'Commerce & feedback', 'Nature', 'Animals & nature', 'Transport',
  'Buildings', 'Home', 'Tools', 'Food & drink', 'Health', 'Sport & games', 'Shapes',
  'People', 'People & emotion',
]

const SITE = 'https://claude-code-icons.vercel.app'

function matches(e: Entry, q: string) {
  const hay = `${e.name} ${e.gesture} ${e.family} ${e.section} ${e.tags.join(' ')}`.toLowerCase()
  return q.split(/\s+/).every((w) => hay.includes(w))
}

// ── static code generation (Vue / HTML tabs) ───────────────────────────────
// The resting picture rendered to markup — every icon rests exactly on its
// base glyph, so this is the honest static version.
function staticSvg(entry: Entry, color: string): string {
  const raw = renderToStaticMarkup(createElement(entry.Icon, { size: 24, trigger: 'manual', color }))
  return raw
    .replace(/<div[^>]*>|<\/div>/g, '')
    .replace(/\s*data-[a-z-]+="[^"]*"/g, '')
}

function vueSnippet(entry: Entry, color: string): string {
  return `<!-- ${entry.name} — static rest glyph (animated version is React-only for now) -->
<template>
  ${staticSvg(entry, color).replace(/\n/g, '\n  ')}
</template>

<script setup lang="ts">
// Purely presentational. For the animated version, see the React tab —
// the gesture definitions port 1:1 to motion-v (Motion for Vue).
</script>`
}

function htmlSnippet(entry: Entry, color: string): string {
  return `<!-- ${entry.name} — static SVG, drop in anywhere -->
${staticSvg(entry, color)}`
}

function cliSnippet(entry: Entry): string {
  return `# one-time: the shared gesture engine (3 small files)
npx shadcn@latest add ${SITE}/r/gesture-core.json

# the icon itself
npx shadcn@latest add ${SITE}/r/${entry.name}.json

# then
import ${entry.name.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join('')}Icon from "@/components/gesture-icons/icons/${entry.name}"`
}

// ── UI ─────────────────────────────────────────────────────────────────────

// ── auto-play ──────────────────────────────────────────────────────────────
// 2秒おきに「画面内の」タイルだけが一斉に踊る。514個全部を同時に走らせると
// 重いので、tick 時に座標で可視判定して絞る。0–400ms のランダム分散で
// 同一フレームへの集中を避ける(play() は再生中なら no-op なので安全)。
interface AutoTile { el: HTMLElement; play: () => void }
const autoTiles = new Set<AutoTile>()

function Tile({ entry, color, onOpen }: { entry: Entry; color: string; onOpen: (e: Entry) => void }) {
  const handle = useRef<GestureHandle>(null)
  const ref = useRef<HTMLButtonElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const item: AutoTile = { el, play: () => handle.current?.play() }
    autoTiles.add(item)
    return () => { autoTiles.delete(item) }
  }, [])
  return (
    <button
      ref={ref}
      className="tile"
      style={{ color }}
      onPointerEnter={() => handle.current?.play()}
      onClick={() => onOpen(entry)}
      aria-label={`${entry.name} — ${entry.gesture}`}
    >
      <entry.Icon size={30} trigger="manual" handleRef={handle} />
      <span className="tilename">{entry.name}</span>
    </button>
  )
}

type Tab = 'react' | 'vue' | 'html' | 'cli'

// Shiki は初回表示時に動的読込 — メインバンドルを太らせない
const TAB_LANG: Record<Tab, string> = { react: 'tsx', vue: 'vue', html: 'html', cli: 'bash' }

async function highlight(code: string, lang: string): Promise<string> {
  const { codeToHtml } = await import('shiki')
  return codeToHtml(code, { lang, theme: 'github-light' })
}

function DetailModal({ entry, color, onClose }: { entry: Entry; color: string; onClose: () => void }) {
  const handle = useRef<GestureHandle>(null)
  const [tab, setTab] = useState<Tab>('react')
  const [reactSrc, setReactSrc] = useState('// loading…')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    sourceLoaders[entry.path]?.().then(setReactSrc)
    const t = setTimeout(() => handle.current?.play(), 350)
    return () => clearTimeout(t)
  }, [entry])

  const vue = useMemo(() => vueSnippet(entry, color), [entry, color])
  const html = useMemo(() => htmlSnippet(entry, color), [entry, color])
  const codeFor: Record<Tab, string> = { react: reactSrc, vue, html, cli: cliSnippet(entry) }

  const [highlighted, setHighlighted] = useState<string | null>(null)
  useEffect(() => {
    let alive = true
    setHighlighted(null)
    highlight(codeFor[tab], TAB_LANG[tab]).then((h) => { if (alive) setHighlighted(h) })
    return () => { alive = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tab, reactSrc, vue, html, entry])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    // モーダル表示中は背景スクロールを止める(モバイルで重要)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal detail" onClick={(e) => e.stopPropagation()}>
        <div className="detailtop">
          <button className="preview" style={{ color }} onClick={() => handle.current?.play()} aria-label="replay">
            <entry.Icon size={88} trigger="manual" handleRef={handle} />
          </button>
          <div className="detailmeta">
            <h3>{entry.name}</h3>
            <p className="gesture">{entry.gesture}</p>
            <p className="chips">
              <span className="family">{entry.family}</span>
              <span className="family">{entry.section}</span>
            </p>
            <p className="tags">{entry.tags.join(' · ')}</p>
            <p className="hint">click the icon to replay</p>
          </div>
          <button className="closebtn" onClick={onClose} aria-label="close">✕</button>
        </div>
        <div className="tabbar">
          {(['react', 'vue', 'html', 'cli'] as Tab[]).map((t) => (
            <button key={t} className={`tabbtn${tab === t ? ' active' : ''}`} onClick={() => setTab(t)}>
              {t === 'cli' ? 'CLI' : t[0].toUpperCase() + t.slice(1)}
            </button>
          ))}
          <span className="spacer" />
          <button
            className="codebtn"
            onClick={() => {
              navigator.clipboard.writeText(codeFor[tab])
              setCopied(true)
              setTimeout(() => setCopied(false), 1200)
            }}
          >
            {copied ? 'copied' : 'copy'}
          </button>
        </div>
        {highlighted ? (
          <div className="codehtml" dangerouslySetInnerHTML={{ __html: highlighted }} />
        ) : (
          <pre>{codeFor[tab]}</pre>
        )}
      </div>
    </div>
  )
}

const DEFAULT_COLOR = '#000000'
const PRESETS = ['#000000', '#6366f1', '#e11d48', '#059669', '#d97706', '#0ea5e9']

export default function App() {
  const [open, setOpen] = useState<Entry | null>(null)
  const [query, setQuery] = useState('')
  const [section, setSection] = useState<string | null>(null)
  const [iconColor, setIconColor] = useState(DEFAULT_COLOR)
  const [auto, setAuto] = useState(true)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!auto) return
    const iv = setInterval(() => {
      const margin = 80
      for (const { el, play } of autoTiles) {
        const r = el.getBoundingClientRect()
        if (r.bottom > -margin && r.top < window.innerHeight + margin) {
          setTimeout(play, Math.random() * 400)
        }
      }
    }, 2000)
    return () => clearInterval(iv)
  }, [auto])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        searchRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const q = query.trim().toLowerCase()
  const sectionNames = useMemo(() => {
    const present = new Set(ALL.map((e) => e.section))
    return SECTION_ORDER.filter((s) => present.has(s))
  }, [])
  const filtered = useMemo(() => {
    let list = ALL
    if (section) list = list.filter((e) => e.section === section)
    if (q) list = list.filter((e) => matches(e, q))
    return list
  }, [q, section])
  const grouped = useMemo(() => {
    if (q) return null
    const by = new Map<string, Entry[]>()
    for (const e of filtered) {
      if (!by.has(e.section)) by.set(e.section, [])
      by.get(e.section)!.push(e)
    }
    return sectionNames.filter((s) => by.has(s)).map((s) => [s, by.get(s)!] as const)
  }, [q, filtered, sectionNames])

  return (
    <main>
      <header>
        <h1>gesture‑icons</h1>
        <p className="lede">
          {ALL.length} icons that do the thing they already mean, once. Hover to play;
          click for React, Vue, HTML and CLI install. Every animation ends exactly on
          the resting picture — morph when it bends, transform when it is rigid,
          dash when a line is drawn, leave the frame when something goes away. Never a fade.
        </p>
      </header>

      <div className="toolbar">
        <div className="searchbar">
          <input
            ref={searchRef}
            type="search"
            placeholder={`Search ${ALL.length} icons…  ( / )`}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search icons"
          />
          <span className="count">{filtered.length}</span>
        </div>
        <div className="colorbar">
          <label className="swatchwrap" title="Pick any color">
            <input type="color" value={iconColor} onChange={(e) => setIconColor(e.target.value)} aria-label="Icon color" />
          </label>
          <span className="hex">{iconColor}</span>
          <div className="presets">
            {PRESETS.map((c) => (
              <button key={c} className={`preset${c === iconColor ? ' active' : ''}`} style={{ background: c }} onClick={() => setIconColor(c)} aria-label={`color ${c}`} />
            ))}
          </div>
          {iconColor !== DEFAULT_COLOR && (
            <button className="codebtn" onClick={() => setIconColor(DEFAULT_COLOR)}>reset</button>
          )}
          <span className="spacer" />
          <button
            className={`chip autoplay${auto ? ' active' : ''}`}
            onClick={() => setAuto(!auto)}
            title="Replay every icon in view every 2 seconds"
          >
            {auto ? '⏸ auto-play' : '▶ auto-play'}
          </button>
        </div>
        <div className="chipsrow">
          <button className={`chip${section === null ? ' active' : ''}`} onClick={() => setSection(null)}>All</button>
          {sectionNames.map((s) => (
            <button key={s} className={`chip${section === s ? ' active' : ''}`} onClick={() => setSection(section === s ? null : s)}>{s}</button>
          ))}
        </div>
      </div>

      {q || section ? (
        <section>
          <div className="grid">
            {filtered.map((e) => <Tile key={e.name} entry={e} color={iconColor} onOpen={setOpen} />)}
          </div>
          {filtered.length === 0 && (
            <p className="empty">No gesture for “{query}” yet — the skill in the repo shows how to make one.</p>
          )}
        </section>
      ) : (
        grouped!.map(([title, entries]) => (
          <section key={title}>
            <h2>{title} <span className="seccount">{entries.length}</span></h2>
            <div className="grid">
              {entries.map((e) => <Tile key={e.name} entry={e} color={iconColor} onOpen={setOpen} />)}
            </div>
          </section>
        ))
      )}

      <section>
        <h2>Install</h2>
        <div className="usagestep">
          <p>
            shadcn-style: each icon ships as a registry item. One command adds the
            shared engine, one adds the icon — code lands in your repo, yours to edit.
            Or just open an icon and copy the file. Only dependency: <a href="https://motion.dev">Motion</a>.
          </p>
          <pre>{`npx shadcn@latest add ${SITE}/r/gesture-core.json   # once
npx shadcn@latest add ${SITE}/r/bell.json           # per icon`}</pre>
        </div>
      </section>

      <footer>
        Built with <a href="https://motion.dev">Motion</a>. Base glyphs from{' '}
        <a href="https://lucide.dev">Lucide</a> (ISC). Philosophy after{' '}
        <a href="https://www.bakai.me/lab/animating-icons">Bakai&apos;s “Animating icons”</a>.{' '}
        <a href="https://github.com/PeterTakahashi/gesture-icons">GitHub</a>
      </footer>
      {open && <DetailModal entry={open} color={iconColor} onClose={() => setOpen(null)} />}
    </main>
  )
}
