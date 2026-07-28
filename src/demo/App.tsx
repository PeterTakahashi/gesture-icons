import { useRef, useState, type ComponentType } from 'react'
import type { GestureHandle } from '../lib/core/useGesture'
import type { GestureIconProps } from '../lib/core/types'
import {
  BellIcon, CartIcon, ChatIcon, DownloadIcon, FunnelIcon, GitBranchIcon,
  HeartIcon, KeyIcon, LayersIcon, MuscleIcon, SearchIcon, SendIcon,
  StarIcon, TrashIcon, WaveIcon,
} from '../lib'
import './styles.css'

// Vite: per-icon raw source for the code view
const sources = import.meta.glob('../lib/icons/*.tsx', { query: '?raw', import: 'default', eager: true }) as Record<string, string>

interface Entry {
  name: string
  file: string
  gesture: string
  family: string
  Icon: ComponentType<GestureIconProps>
}

const SECTIONS: { title: string; entries: Entry[] }[] = [
  {
    title: 'Hands',
    entries: [
      { name: 'muscle', file: 'muscle', gesture: 'the arm flexes', family: 'morph', Icon: MuscleIcon },
      { name: 'wave', file: 'wave', gesture: 'the hand waves hello', family: 'rigid', Icon: WaveIcon },
    ],
  },
  {
    title: 'Objects',
    entries: [
      { name: 'bell', file: 'bell', gesture: 'it rings', family: 'rigid', Icon: BellIcon },
      { name: 'key', file: 'key', gesture: 'it turns in the lock', family: 'rigid', Icon: KeyIcon },
      { name: 'trash', file: 'trash', gesture: 'the lid opens', family: 'rigid', Icon: TrashIcon },
    ],
  },
  {
    title: 'Communication',
    entries: [
      { name: 'send', file: 'send', gesture: 'the plane actually leaves', family: 'travel', Icon: SendIcon },
      { name: 'chat', file: 'chat', gesture: 'someone is typing', family: 'secondary', Icon: ChatIcon },
    ],
  },
  {
    title: 'Workspace',
    entries: [
      { name: 'git-branch', file: 'git-branch', gesture: 'it rewrites itself', family: 'draw-on', Icon: GitBranchIcon },
      { name: 'layers', file: 'layers', gesture: 'the stack takes the drop', family: 'rigid', Icon: LayersIcon },
      { name: 'download', file: 'download', gesture: 'the arrow lands in the tray', family: 'rigid', Icon: DownloadIcon },
    ],
  },
  {
    title: 'Data',
    entries: [
      { name: 'search', file: 'search', gesture: 'the lens scans', family: 'rigid', Icon: SearchIcon },
      { name: 'funnel', file: 'funnel', gesture: 'something passes through', family: 'travel', Icon: FunnelIcon },
    ],
  },
  {
    title: 'Commerce & feedback',
    entries: [
      { name: 'cart', file: 'cart', gesture: 'it is pushed', family: 'rigid', Icon: CartIcon },
      { name: 'heart', file: 'heart', gesture: 'it beats, lub-dub', family: 'rigid', Icon: HeartIcon },
      { name: 'star', file: 'star', gesture: 'it gathers and blooms', family: 'rigid', Icon: StarIcon },
    ],
  },
]

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
            <code>skill/</code> directory and README.
          </p>
        </div>
      </div>
    </section>
  )
}

function Card({ entry, onCode }: { entry: Entry; onCode: (e: Entry) => void }) {
  const handle = useRef<GestureHandle>(null)
  return (
    <div className="card">
      <button
        className="stage"
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
  const src = sources[`../lib/icons/${entry.file}.tsx`] ?? '// source not found'
  const [copied, setCopied] = useState(false)
  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modalbar">
          <span className="modaltitle">{entry.file}.tsx</span>
          <div>
            <button
              className="codebtn"
              onClick={() => {
                navigator.clipboard.writeText(src)
                setCopied(true)
                setTimeout(() => setCopied(false), 1200)
              }}
            >
              {copied ? 'copied' : 'copy'}
            </button>
            <button className="codebtn" onClick={onClose}>close</button>
          </div>
        </div>
        <pre>{src}</pre>
      </div>
    </div>
  )
}

export default function App() {
  const [code, setCode] = useState<Entry | null>(null)
  return (
    <main>
      <header>
        <h1>gesture‑icons</h1>
        <p className="lede">
          Icons that do the thing they already mean, once. Hover a tile to play its
          gesture; every animation ends exactly on the resting picture. Morph when the
          material bends, transform when it is rigid, dash when a line is drawn,
          leave the frame when something goes away — never a fade.
        </p>
      </header>
      {SECTIONS.map((s) => (
        <section key={s.title}>
          <h2>{s.title}</h2>
          <div className="grid">
            {s.entries.map((e) => <Card key={e.name} entry={e} onCode={setCode} />)}
          </div>
        </section>
      ))}
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
