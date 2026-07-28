# animating-icons — semantic gesture icons

Rules for animating a static icon so the motion *is* the meaning.
Read `families.md` to pick the mechanism, `mechanics.md` for the craft rules,
`morphing.md` when the shape genuinely bends, `verification.md` before calling
anything done.

## The one rule

The gesture must be the thing the icon already means, happening **once**.
A key rotates because rotating a key is what you do with a credential.
A bell swings because that is how a bell rings. If the icon is a noun with no
mechanism — no honest verb — leave it still. A spin that merely "looks alive"
is decoration, and decoration is the failure mode.

## Prompts that work

The everyday one:

> Here is the icon. Animate it so the gesture is the thing this object already
> means, happening once. Use whatever the shape needs: a transform if the part
> is rigid, a morph if the material genuinely bends, a mask if something passes
> behind, dash length if a line is drawn. Derive the numbers from the path, not
> from taste. It has to rest as the original.

To force thinking before keyframes:

> Before any keyframes: tell me the verb this object does, which single part
> carries it, and which mechanism that needs. Then tell me what you will NOT
> animate and why.

The shield, before adding motion at all:

> Is there an honest gesture here, or is this a noun with no mechanism?
> If there is no real verb, say so and leave it still.

Expect to iterate. The rules hold; the numbers need tuning against the eye.
