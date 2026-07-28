import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Compass — the needle finds north. It swings hard about the compass's own
 * center, decaying in ever-smaller arcs until it settles pointing true —
 * the ring itself never moves, only the needle hunts.
 * Base geometry: Lucide `compass` (ISC).
 */
const DUR = 1.1

export function CompassIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'compass'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="m16.24 7.76-1.804 5.411a2 2 0 0 1-1.265 1.265L7.76 16.24l1.804-5.411a2 2 0 0 1 1.265-1.265z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -28, 18, -10, 4, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.38, 0.58, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'compass',
  gesture: 'the needle finds north',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['direction', 'navigate', 'explore'],
}

export default CompassIcon
