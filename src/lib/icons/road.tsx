import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Road — the miles pass. The three centerline dashes nudge down and back,
 * staggered bottom-to-top so the motion reads as flowing toward the viewer —
 * motion without moving. The road's edges hold still.
 * Base geometry: Lucide `road` (ISC).
 */
const DUR = 0.8
const DASHES = [
  { d: 'M12 17v4', delay: 0 },
  { d: 'M12 9v3', delay: 0.09 },
  { d: 'M12 5V3', delay: 0.18 },
]

export function RoadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'road'}
      {...hoverProps}
    >
      {DASHES.map((dash) => (
        <motion.path
          key={dash.d}
          d={dash.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 2, 0],
              transition: { duration: DUR, delay: dash.delay, times: [0, 0.5, 1], ease: easeInOutCubic },
            },
          }}
        />
      ))}
      <path d="M2.077 18.449A2 2 0 0 0 4 21h16a2 2 0 0 0 1.924-2.55l-4-14A2 2 0 0 0 16 3H8a2 2 0 0 0-1.924 1.45z" />
    </svg>
  )
}

export const meta = {
  name: 'road',
  gesture: 'the miles pass',
  family: 'secondary' as const,
  section: 'Transport',
  tags: ['highway', 'journey', 'road'],
}

export default RoadIcon
