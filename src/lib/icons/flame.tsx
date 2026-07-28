import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Flame — it flickers. A quick, organic flicker: uneven scaleY stretches
 * and squashes anchored at the base, with a matching wobble in rotation —
 * never symmetric, never reading as a loop.
 * Base geometry: Lucide `flame` (ISC).
 */
const DUR = 0.85

export function FlameIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flame'}
      {...hoverProps}
    >
      <motion.path
        d="M12 3q1 4 4 6.5t3 5.5a1 1 0 0 1-14 0 5 5 0 0 1 1-3 1 1 0 0 0 5 0c0-2-1.5-3-1.5-5q0-2 2.5-4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1, rotate: 0 },
          animate: {
            scaleY: [1, 1.08, 0.95, 1.05, 1],
            rotate: [0, -3, 2.5, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'flame',
  gesture: 'it flickers',
  family: 'rigid' as const,
  section: 'People',
  tags: ['fire', 'hot', 'trending', 'burn'],
}

export default FlameIcon
