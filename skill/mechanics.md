# Mechanics — the craft rules

## Timing

A gesture is not a state change. The under-300ms interface rule is for things
the user is *waiting on*; a gesture is something they are *watching*, so it
gets room to breathe: **one clear beat in a little under a second**, returning
exactly to where it started.

- It waits a breath before playing (hover-intent dwell, ~100–150ms, owned by JS).
- A started gesture always finishes. Cancelling on pointer-leave throws the
  icon from mid-flight back to rest — the only ugly frame is the one where the
  gesture never got to finish. Intent guards the start; completion guards the end.
- Larger motion runs slower. Exits run a touch faster than entrances.
- Leaving the frame is the one place ease-in is right. Arriving is always ease-out.
- Nothing in free flight is eased — a tossed thing spins linearly; nothing
  torques it mid-air. Easing an orbit is the tell of a fake one.
- Fast where nobody is watching, slow where they are.

## Rest states must be declared

A keyframe's 0% only exists while the animation is attached. At rest there is
no animation, so any part whose resting value is not the natural default
(a hidden dot, a scaled secondary, a swapped mask) must state its rest value
outside the keyframes — in this library, in the `normal` variant *and* in the
element's attrs. Every `animate` track ends exactly on its rest value, so
finishing is invisible and the reset (`set('normal')`) costs nothing.

## One clock

Parts that must land on a shared frame run on ONE clock (same duration, times
as percentages). Split clocks and a handoff, an impact, a counter-rotation
stop meaning anything. Consequences that don't need to sync (rings, sparkles)
may take their own delay in ms — easier to tune than hunting percentages.

## Velocity handoff

One movement split into two keyframe segments must hand its speed across the
join: the end slope of curve A times its average speed must equal the start
slope of curve B times its — otherwise the thing decelerates to a dead stop
at an invisible waypoint. Derive the beziers, don't taste them.

## The 1.02 rule

Dash-hidden strokes hide at offset **1.02, not 1**: at exactly 1 the dash's
round cap paints a dot on the path's endpoint. Two percent of overlap buries
the caps. Same family of bug: scale to **0.001, not 0** (a scale(0) layer
rasterizes degenerate and comes back blurry).

## Pivots and propagation

`transform-box: view-box` + `transform-origin` in viewBox units puts the hinge
where the geometry says it is. Impacts propagate: the middle layer is not hit
by the falling thing, it is hit by the layer above it — ~3% (30–40ms) lag per
step, on the same curve.

## Anticipation and overshoot in the curve

For a one-beat gesture, put the wind-up and the settle in the bezier itself:
`cubic-bezier(0.42, -0.32, 0.28, 1.26)` sags below rest first (the load),
drives to the pose, and carries past it before settling. Chrome extrapolates
paths and transforms outside their two states — use it.
