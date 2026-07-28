import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart } from '../core/easings'

/**
 * Activity — the pulse passes. The EKG trace erases, then a single fast
 * pass redraws it whole — a heartbeat crossing the monitor once, quick over
 * the spike, never a fade.
 * Base geometry: Lucide `activity` (ISC).
 */
const DUR = 0.9

export function ActivityIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'activity'}
      {...hoverProps}
    >
      <motion.path
        d="M22 12h-2.48a2 2 0 0 0-1.93 1.46l-2.35 8.36a.25.25 0 0 1-.48 0L9.24 2.18a.25.25 0 0 0-.48 0l-2.35 8.36A2 2 0 0 1 4.49 12H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.26, 0.6], ease: [easeInCubic, 'linear', easeInOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'activity',
  gesture: 'the pulse passes',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['health', 'monitor', 'heartbeat'],
}

export default ActivityIcon
