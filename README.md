# gesture-icons

Semantic animated icons for React. Each icon performs **the gesture it already
means, happening once** — a bell rings, a key turns in its lock, a paper plane
actually leaves the frame, an arm flexes. Nothing spins because spinning looks
alive; if an icon is a noun with no verb, it stays still.

Built with [Motion](https://motion.dev). Base glyphs from
[Lucide](https://lucide.dev) (ISC). Philosophy and one adapted drawing (the
muscle poses) from
[Bakai Tolondu uulu's "Animating icons"](https://www.bakai.me/lab/animating-icons),
who shared his icons for reuse — thank you.

```bash
npm install
npm run dev      # demo grid — hover a tile to play its gesture
```

## Using an icon

Every icon is one self-contained file. Copy it, or import from the library:

```tsx
import { BellIcon, MuscleIcon } from './src/lib'

<BellIcon size={28} />                    // plays on hover (default)
<MuscleIcon trigger="mount" />            // plays once on mount

// imperative
const handle = useRef<GestureHandle>(null)
<KeyIcon trigger="manual" handleRef={handle} />
handle.current?.play()
```

Props: `size`, `color`, `strokeWidth`, `trigger` (`'hover' | 'mount' | 'manual'`),
`handleRef`, plus `className`/`style`. Exports are named and tree-shakeable.
`prefers-reduced-motion` turns every play into a no-op.

## The rules (short version)

1. **The gesture is the meaning.** One verb, one beat, a little under a second,
   ending exactly on the resting picture.
2. **Match the mechanism to the material.**
   - rigid part → transform keyframes about a real hinge
   - genuinely bending shape (hands) → true path morph, same commands both poses
   - something goes away → it *leaves the frame* and returns; fading is banned
   - a line being made → dash length, in the order a hand would draw it
   - detail passing behind/through → masks and secondary elements, hidden at
     rest by geometry, never mid-fade
3. **Intent guards the start, completion guards the end.** A hover waits a
   breath (~110ms dwell); a started gesture always finishes; the last keyframe
   of every track is its rest value, so the reset is invisible.
4. **Declare rest states.** A keyframe's 0% only exists while the animation is
   attached — anything non-default at rest is stated in the `normal` variant
   *and* the element's attributes.
5. **The small print of craft:** hide dashes at 1.02 (round caps paint dots at
   exactly 1); scale to 0.001, never 0; impacts propagate with ~3% lag per
   layer; nothing reacts one frame before it is touched; exits ease-in,
   arrivals ease-out; free flight is linear.

The full rules live in [`skill/`](./skill) — five markdown files
(`SKILL.md`, `families.md`, `mechanics.md`, `morphing.md`, `verification.md`)
you can hand to a model or a human. The prompts that generate new icons are in
`SKILL.md`.

## Anatomy of an icon

```
src/lib/
  core/
    useGesture.ts   # trigger discipline: dwell, play-to-completion, reduced motion
    easings.ts      # the house curves, named for what they mean
    types.ts        # shared props + svg defaults
  icons/
    bell.tsx        # one file per icon: glyph + variants + timing + why
  index.ts          # named exports
css-only/           # the same discipline in pure CSS (bell, heart)
skill/              # the rules as prose
```

An icon file is ~60 lines: the base paths, a `normal` variant (rest), an
`animate` variant (keyframes + times + eases), and a comment saying what the
gesture is and why. To add an icon:

1. Get the glyph (Lucide/Phosphor/Hugeicons — keep the license note).
2. Name the verb. No verb → stop.
3. Pick the family (see `skill/families.md`) and the one part that moves.
4. Author keyframes that end on rest. Steal curves from `easings.ts`.
5. Run the checklist in `skill/verification.md` — screenshot rest before and
   after, scrub the frames, fix the worst frame, repeat.
6. Export it from `index.ts`, add it to the demo grid.

## Why Motion and not CSS?

The original system this is inspired by is CSS-only, morphing via the CSS
`d: path()` property — which is Chromium-only. Motion interpolates path
strings in JS, so morphs work cross-browser, keyframe times/eases read as
data, and play-to-completion is a promise instead of an animationend listener.
The two pure-CSS icons in `css-only/` show the same discipline without any
library, for contexts where React isn't available.
