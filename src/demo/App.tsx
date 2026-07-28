import { useEffect, useMemo, useRef, useState, type ComponentType } from 'react'
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
const sources = import.meta.glob('../lib/icons/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

interface Entry extends IconMeta {
  Icon: ComponentType<GestureIconProps>
  source: string
}

const ALL: Entry[] = Object.entries(modules)
  .filter(([, m]) => m.meta && m.default)
  .map(([path, m]) => ({ ...m.meta, Icon: m.default, source: sources[path] ?? '' }))
  .sort((a, b) => a.name.localeCompare(b.name))

const SECTION_ORDER = [
  'Hands', 'Interface', 'Objects', 'Communication', 'Media', 'Workspace',
  'Files & time', 'Data', 'Nature', 'Transport', 'Commerce & feedback', 'People',
]

function matches(e: Entry, q: string) {
  const hay = `${e.name} ${e.gesture} ${e.family} ${e.section} ${e.tags.join(' ')}`.toLowerCase()
  return q.split(/\s+/).every((w) => hay.includes(w))
}

// ── UI ─────────────────────────────────────────────────────────────────────

function Card({ entry, color, onCode }: { entry: Entry; color: string; onCode: (e: Entry) => void }) {
  const handle = useRef<GestureHandle>(null)
  return (
    <div className="card">
      <button
        className="stage"
        style={{ color }}
        onPointerEnter={() => handle.current?.play()}
        onClick={() => handle.current?.play()}
        aria-label={`play ${entry.name}`}
      >
        <entry.Icon size={44} trigger="manual" handleRef={handle} />
      </button>
      <div className="meta">
        <div>
          <div className="name">{entry.name}</div>
          <div className="gesture">{entry.gesture}</div>
        </div>
        <div className="actions">
          <span className="family">{entry.family}</span>
          <button className="codebtn" onClick={() => onCode(entry)}>code</button>
        </div>
      </div>
    </div>
  )
}

function CodeModal({ entry, onClose }: { entry: Entry; onClose: () => void }) {
  const [copied, setCopied] = useState(false)
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalbar">
          <span className="modaltitle">{entry.name}.tsx</span>
          <div>
            <button
              className="codebtn"
              onClick={() => {
                navigator.clipboard.writeText(entry.source)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
              }}
            >
              {copied ? 'copied' : 'copy'}
            </button>
            <button className="codebtn" onClick={onClose}>close</button>
          </div>
        </div>
        <pre>{entry.source}</pre>
      </div>
    </div>
  )
}

const USAGE_QUICKSTART = `# 1. grab the engine (3 small files) + any icon file
src/lib/core/useGesture.ts   # trigger discipline
src/lib/core/easings.ts      # the house curves
src/lib/core/types.ts        # shared props
src/lib/icons/bell.tsx       # ← "code" button on any tile

# 2. install the only runtime dependency
npm install motion`

const USAGE_BASIC = `import { BellIcon, HeartIcon, KeyIcon } from './lib'

// plays its gesture on hover (default), after a 110ms intent dwell
<BellIcon />

// size / color / stroke — color defaults to currentColor,
// so it also just inherits CSS \`color\` from the parent
<BellIcon size={32} color="#e11d48" strokeWidth={1.5} />

// play once when the component appears
<HeartIcon trigger="mount" />`

const USAGE_IMPERATIVE = `import { useRef } from 'react'
import { KeyIcon, type GestureHandle } from './lib'

function CopyKeyButton() {
  const key = useRef<GestureHandle>(null)
  return (
    <button onClick={() => key.current?.play()}>
      <KeyIcon trigger="manual" handleRef={key} />
      Rotate API key
    </button>
  )
}`

function Usage() {
  return (
    <section>
      <h2>Usage</h2>
      <div className="usage">
        <div className="usagestep">
          <h3>Copy, don&apos;t install</h3>
          <p>
            Every icon is one self-contained file — open <em>code</em> on a tile,
            copy it into your project along with the three files in{' '}
            <code>src/lib/core/</code>. The only dependency is{' '}
            <a href="https://motion.dev">Motion</a>.
          </p>
          <pre>{USAGE_QUICKSTART}</pre>
        </div>
        <div className="usagestep">
          <h3>Triggers</h3>
          <p>
            <code>trigger</code> is <code>&quot;hover&quot;</code> (default),{' '}
            <code>&quot;mount&quot;</code>, or <code>&quot;manual&quot;</code>. A started
            gesture always finishes and lands exactly on the resting picture;{' '}
            <code>prefers-reduced-motion</code> turns every play into a no-op.
          </p>
          <pre>{USAGE_BASIC}</pre>
        </div>
        <div className="usagestep">
          <h3>Imperative — play it when something happens</h3>
          <p>
            Pass <code>handleRef</code> and call <code>play()</code> — it resolves
            when the gesture has finished. Good for form submits, copy buttons,
            notification arrivals.
          </p>
          <pre>{USAGE_IMPERATIVE}</pre>
        </div>
        <div className="usagestep">
          <h3>Adding your own icon</h3>
          <p>
            Name the verb → pick the family → animate the one part that carries
            it → end every track on its rest value. The full rules (taxonomy,
            mechanics, morphing, verification checklist — and the prompts to
            generate icons with a model) live in the repo&apos;s{' '}
            <code>skill/</code> directory and README. Export <code>meta</code> and
            a default component and the icon appears here automatically.
          </p>
        </div>
      </div>
    </section>
  )
}

const DEFAULT_COLOR = '#000000'
const PRESETS = ['#000000', '#6366f1', '#e11d48', '#059669', '#d97706', '#0ea5e9']

export default function App() {
  const [code, setCode] = useState<Entry | null>(null)
  const [query, setQuery] = useState('')
  const [iconColor, setIconColor] = useState(DEFAULT_COLOR)
  const searchRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === '/' && document.activeElement?.tagName !== 'INPUT') {
        e.preventDefault()
        searchRef.current?.focus()
      }
      if (e.key === 'Escape') searchRef.current?.blur()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const q = query.trim().toLowerCase()
  const filtered = useMemo(() => (q ? ALL.filter((e) => matches(e, q)) : ALL), [q])
  const sections = useMemo(() => {
    if (q) return null
    const by = new Map<string, Entry[]>()
    for (const e of ALL) {
      if (!by.has(e.section)) by.set(e.section, [])
      by.get(e.section)!.push(e)
    }
    return [...by.entries()].sort(
      (a, b) => (SECTION_ORDER.indexOf(a[0]) + 99) - (SECTION_ORDER.indexOf(b[0]) + 99) ||
        SECTION_ORDER.indexOf(a[0]) - SECTION_ORDER.indexOf(b[0]),
    )
  }, [q])

  return (
    <main>
      <header>
        <h1>gesture‑icons</h1>
        <p className="lede">
          {ALL.length} icons that do the thing they already mean, once. Hover a tile
          to play its gesture; every animation ends exactly on the resting picture.
          Morph when the material bends, transform when it is rigid, dash when a
          line is drawn, leave the frame when something goes away — never a fade.
        </p>
      </header>

      <div className="searchbar">
        <input
          ref={searchRef}
          type="search"
          placeholder={`Search ${ALL.length} icons…  ( / )`}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search icons"
        />
        {q && <span className="count">{filtered.length} result{filtered.length === 1 ? '' : 's'}</span>}
      </div>

      <div className="colorbar">
        <label className="swatchwrap" title="Pick any color">
          <input
            type="color"
            value={iconColor}
            onChange={(e) => setIconColor(e.target.value)}
            aria-label="Icon color"
          />
        </label>
        <span className="hex">{iconColor}</span>
        <div className="presets">
          {PRESETS.map((c) => (
            <button
              key={c}
              className={`preset${c === iconColor ? ' active' : ''}`}
              style={{ background: c }}
              onClick={() => setIconColor(c)}
              aria-label={`color ${c}`}
            />
          ))}
        </div>
        {iconColor !== DEFAULT_COLOR && (
          <button className="codebtn" onClick={() => setIconColor(DEFAULT_COLOR)}>reset</button>
        )}
      </div>

      {q ? (
        <section>
          <div className="grid">
            {filtered.map((e) => <Card key={e.name} entry={e} color={iconColor} onCode={setCode} />)}
          </div>
          {filtered.length === 0 && (
            <p className="empty">No gesture for “{query}” yet — the skill in the repo shows how to make one.</p>
          )}
        </section>
      ) : (
        sections!.map(([title, entries]) => (
          <section key={title}>
            <h2>{title}</h2>
            <div className="grid">
              {entries.map((e) => <Card key={e.name} entry={e} color={iconColor} onCode={setCode} />)}
            </div>
          </section>
        ))
      )}

      <Usage />
      <footer>
        Built with <a href="https://motion.dev">Motion</a>. Base glyphs from{' '}
        <a href="https://lucide.dev">Lucide</a> (ISC). Philosophy after{' '}
        <a href="https://www.bakai.me/lab/animating-icons">Bakai&apos;s “Animating icons”</a>.
      </footer>
      {code && <CodeModal entry={code} onClose={() => setCode(null)} />}
    </main>
  )
}
