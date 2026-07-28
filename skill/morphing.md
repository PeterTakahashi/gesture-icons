# Morphing — when the shape genuinely bends

A hand does not slide or spin. It changes shape: fingers fold, a palm gathers
into a fist. No transform can fake that, so these are true vector morphs.

## The contract

The same path drawn twice — once per pose — with **the same commands in the
same order** (`M C C L …` must match exactly). Then every point walks to its
opposite number and the browser (or Motion's string interpolation) does the
tween. If the command lists differ, nothing interpolates.

## Authoring poses

Storyboard it: draw the poses frame by frame (Figma or by hand on the icon
grid), the way you would storyboard a shot. Keep the two poses close — the
muscle works because its relaxed and flexed drawings share most of their
anchors, so the flex bulges and releases like tissue instead of teleporting.

Anchor budget: every anchor in pose A must exist in pose B. Add anchors to the
simpler pose (collapse two onto one spot) rather than removing from the richer
one.

## Timing a morph

A shape morphing on screen is the textbook ease-in-out case. For a flex-and-
release beat:

- in: `cubic-bezier(0.42, -0.32, 0.28, 1.26)` — sag (anticipation), drive,
  overshoot past the peak, settle onto it
- hold the pose a beat so it registers (~25% of the clock)
- out: high initial velocity, a hair of extrapolation past rest, land exactly
  on the original — the last keyframe IS the rest path

## Partner tracks

Anything riding the morph (a fist, a crease) runs on the same clock and the
same curves, or it detaches visually. Creases that exist only in the flexed
pose are *written on* with a pen curve as the muscle bunches and un-written a
beat after it starts to release — dash length, hidden at 1.02.

## In this library

Morphs are Motion keyframes on the `d` attribute:

```tsx
variants={{
  normal: { d: REST },
  animate: { d: [REST, FLEX, FLEX, REST], transition: { times, ease } },
}}
```

Motion interpolates the numbers inside matched path strings, so this works
cross-browser (unlike the CSS `d: path()` property, which is Chromium-only).
