import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Repeat 1 — it makes its move. Each chevron NUDGEs further along the
 * direction its own rail already points it — top chevron right, bottom
 * chevron left — with a wind-up back toward the rail, a drive past the
 * mark, and a settleBack home. The rail it meets takes a 1-unit contact
 * nudge right as the chevron arrives, never before. The "1" holds still —
 * it is the count, not the motion.
 * Base geometry: Lucide `repeat-1` (ISC).
 */
const DUR = 0.85

export function Repeat1Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'repeat 1'}
      {...hoverProps}
    >
      <motion.path
        d="m17 2 4 4-4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 1.8, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M3 11v-1a4 4 0 0 1 4-4h14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.66, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="m7 22-4-4 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M21 13v1a4 4 0 0 1-4 4H3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, -1, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.66, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M11 10h1v4" />
    </svg>
  )
}

export const meta = {
  name: 'repeat-1',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['navigate', 'step', 'repeat'],
}

export default Repeat1Icon
