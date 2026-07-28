/**
 * House easing vocabulary.
 *
 * The rules these encode:
 *  - Arriving is always an ease-out. Leaving the frame is the one place ease-in is right.
 *  - A shape morphing on screen is the textbook ease-in-out case.
 *  - A pen leaves fast and eases into its stop — that separates writing from a progress bar.
 *  - Nothing in flight is eased (a tossed key spins linearly; nothing torques it mid-air).
 *  - Anticipation/overshoot live in the curve, not in extra keyframes, when the motion
 *    is one continuous beat (負の y1 = 予備動作, y2 > 1 = 行き過ぎ).
 */
export type Bezier = [number, number, number, number]

/** Arriving, standard. */
export const easeOutQuart: Bezier = [0.25, 1, 0.5, 1]
/** Arriving, snappy — high initial velocity, hard finish, no crawl to the mark. */
export const easeOutQuint: Bezier = [0.23, 1, 0.32, 1]
/** Wind whipping out; something already fast when it appears. */
export const easeOutExpo: Bezier = [0.16, 1, 0.3, 1]
/** Leaving the frame — departs at speed, not at its slowest. */
export const easeInCubic: Bezier = [0.55, 0.055, 0.675, 0.19]
/** Gravity: a fall accelerates. */
export const gravity: Bezier = [0.55, 0, 0.9, 0.45]
/** A shape morphing on screen. */
export const easeInOutQuart: Bezier = [0.76, 0, 0.24, 1]
/** Gentle inout for small rigid moves. */
export const easeInOutCubic: Bezier = [0.65, 0, 0.35, 1]
/** Pen stroke: leaves fast, eases into its stop. */
export const pen: Bezier = [0.45, 0, 0.15, 1]
/** One-beat gesture with built-in anticipation and overshoot (sag → drive → past → settle). */
export const windupOvershoot: Bezier = [0.42, -0.32, 0.28, 1.26]
/** Small overshoot on a settle. */
export const settleBack: Bezier = [0.34, 1.56, 0.64, 1]
