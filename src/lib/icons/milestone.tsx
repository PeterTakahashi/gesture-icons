import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic } from '../core/easings'

/**
 * Milestone — the distance is marked. The sign presses down onto its post
 * with a firm, hard stop — no bounce — then settles still. Another mile.
 * The post above and below the sign never moves.
 * Base geometry: Lucide `milestone` (ISC).
 */
const DUR = 0.75

export function MilestoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'milestone'}
      {...hoverProps}
    >
      <path d="M12 13v8" />
      <path d="M12 3v3" />
      <motion.path
        d="M18.172 6a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H4a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, 1, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInCubic, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'milestone',
  gesture: 'the distance is marked',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['marker', 'progress', 'road'],
}

export default MilestoneIcon
