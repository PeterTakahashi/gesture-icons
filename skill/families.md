# Animation families

Picking the right mechanism is most of the work. Ask: **what does this object
do, and which single part carries it?** Then match the material to the move.

## 1. Rigid transforms (the default)

Most icons are rigid objects with parts that slide, turn, or drop. The shape
never deforms — so the animation is transform keyframes on the part that
carries the verb, hinged at a real pivot.

- bell → swings about the loop it hangs from; the clapper lags (inertia is late)
- key → turns about the bow, past 90°, and comes back
- trash → the lid opens on a hinge and falls shut
- cart → drawn back, pushed forward, tips slightly over the front wheels

Rules: pick the pivot from the geometry (`transform-origin` in viewBox units,
`transform-box: view-box`). Decaying swings, each smaller than the last.
Impacts propagate with a ~3% lag per layer — three things leaving on the same
frame read as one rigid block, and a rigid block has no physics.

## 2. Morphs (when the material genuinely bends)

Hands, muscle, anything organic. No transform can fake a shape change — see
`morphing.md`. Hardest and most rewarding; earn it.

## 3. Travel and come back

Something leaves the frame and returns. The plane flies off along its own nose
axis, is repositioned while genuinely off-screen, and arrives back.
**Hiding by fading is banned. Hiding by leaving is honest.** The icon clips at
its own edge (SVG overflow), so "gone" is literal. Do the impossible bit —
the reposition — where nobody is looking, between two off-frame positions.

## 4. Draw it on (stroke length)

A line writes itself in the order a hand would draw it, using dash length —
never a fade. The git branch drains into its head and is rewritten:
trunk, loop, branch, dot. A pen leaves fast and eases into its stop
(`cubic-bezier(0.45, 0, 0.15, 1)`) — that is what separates writing from a
progress bar.

## 5. Move the holes (masks) / secondary elements

In a filled icon the details are holes cut out of the ink: animate the mask,
not the mark. In stroke icons the equivalent is secondary elements that exist
only during the gesture — typing dots, speed lines, a drop through a funnel.
They must be **hidden at rest by geometry or scale, never mid-fade**, and the
resting picture must be byte-for-byte the original glyph.

## Decision tree

1. What is the verb? No verb → no animation.
2. Which single part carries it? Everything else stays still.
3. Is that part rigid? → transforms. Does it bend? → morph.
   Does it leave? → travel. Is it a line being made? → draw-on.
   Does something pass behind/through? → mask or secondary element.
