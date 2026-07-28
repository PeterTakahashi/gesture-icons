# Verification — before an icon ships

Judge nothing by intention; judge frames.

## The checklist

1. **Rest is the original.** Screenshot before any interaction and after the
   gesture completes: both must be pixel-identical to the source glyph.
   No parked dots (see the 1.02 rule), no half-scaled secondaries, no
   permanently-dimmed strokes from an undeclared rest state.
2. **One verb.** Describe the animation in one sentence containing one verb.
   If you need "and", two things are competing.
3. **The gesture finishes.** Enter and leave mid-flight: the animation must
   run to completion, never snap. Sweep across the icon four times fast —
   it should play at most once per entry and never stutter.
4. **Nothing fades that could move.** Scan for opacity keyframes: each one
   must be either a hard gate while a dash is at zero length, or justified in
   a comment. Hiding is done by leaving the frame, by mask, or by scale.
5. **Contact frames.** Anything that is hit must not react before it is
   touched. Step through the frames at the impact: the gap must be closed on
   the frame the reaction starts. Derive the percentage from the distances,
   don't eyeball it.
6. **Clearance.** Anything passing near a line needs measured clearance
   (sample points if in doubt) — "make sure it does not touch, count it
   properly."
7. **Reduced motion.** With `prefers-reduced-motion`, the icon is a perfectly
   good static icon. No play, no jank.
8. **Interrupted exit.** Leave the pointer mid-gesture and re-enter during the
   tail: no double-fire, no mid-flight restart.

## The loop

Render at ship size *and* at 4× — some bugs (blurry rebuilt layers, cap dots,
hairline seams) only exist at one of the two. Record the gesture, scrub it
frame by frame, and name the worst frame. Fix that frame. Repeat until the
worst frame is fine.
