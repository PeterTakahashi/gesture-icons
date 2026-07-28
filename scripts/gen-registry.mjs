// Generates registry.json (shadcn registry schema) from src/lib/icons/,
// then `npx shadcn build` emits installable items to public/r/.
// Install UX:
//   npx shadcn@latest add https://claude-code-icons.vercel.app/r/gesture-core.json
//   npx shadcn@latest add https://claude-code-icons.vercel.app/r/bell.json
import { readdirSync, readFileSync, writeFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const root = join(dirname(fileURLToPath(import.meta.url)), '..')
const iconsDir = join(root, 'src/lib/icons')
const SITE = 'https://claude-code-icons.vercel.app'

const items = [
  {
    name: 'gesture-core',
    type: 'registry:lib',
    title: 'Gesture engine',
    description:
      'The shared engine for gesture-icons: hover-intent + play-to-completion trigger discipline, the house easing curves, and shared types. Required once.',
    dependencies: ['motion'],
    files: [
      { path: 'src/lib/core/useGesture.ts', type: 'registry:lib', target: 'components/gesture-icons/core/useGesture.ts' },
      { path: 'src/lib/core/easings.ts', type: 'registry:lib', target: 'components/gesture-icons/core/easings.ts' },
      { path: 'src/lib/core/types.ts', type: 'registry:lib', target: 'components/gesture-icons/core/types.ts' },
    ],
  },
]

for (const f of readdirSync(iconsDir).filter((f) => f.endsWith('.tsx')).sort()) {
  const src = readFileSync(join(iconsDir, f), 'utf8')
  const name = f.replace(/\.tsx$/, '')
  const gesture = src.match(/gesture:\s*'([^']*)'/)?.[1] ?? ''
  items.push({
    name,
    type: 'registry:component',
    title: name,
    description: `Semantic animated icon — ${gesture}. Ends exactly on its resting picture.`,
    dependencies: ['motion'],
    registryDependencies: [`${SITE}/r/gesture-core.json`],
    files: [
      { path: `src/lib/icons/${f}`, type: 'registry:component', target: `components/gesture-icons/icons/${f}` },
    ],
  })
}

const registry = {
  $schema: 'https://ui.shadcn.com/schema/registry.json',
  name: 'gesture-icons',
  homepage: SITE,
  items,
}

writeFileSync(join(root, 'registry.json'), JSON.stringify(registry, null, 1))
console.log(`registry.json: ${items.length} items (1 core + ${items.length - 1} icons)`)
