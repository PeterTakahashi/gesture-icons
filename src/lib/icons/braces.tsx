import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Braces — the block closes. Each brace NUDGEs toward the other — a small
 * wind-up outward, a drive inward, a settle back home — closing over their
 * contents. The right brace runs the same beat a hair later, so the two
 * close a beat apart rather than in a mirrored lockstep.
 * Base geometry: Lucide `braces` (ISC).
 */
const DUR = 0.85

export function BracesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'braces'}
      {...hoverProps}
    >
      <motion.path
        d="M8 3H7a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2 2 2 0 0 1 2 2v5c0 1.1.9 2 2 2h1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M16 21h1a2 2 0 0 0 2-2v-5c0-1.1.9-2 2-2a2 2 0 0 1-2-2V5a2 2 0 0 0-2-2h-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.4, -1.2, 0],
            transition: { duration: DUR, delay: 0.06, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'braces',
  gesture: 'the block closes',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['json', 'code', 'scope'],
}

export default BracesIcon
