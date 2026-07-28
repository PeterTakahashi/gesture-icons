import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cloudy — the layers drift. Two clouds, two depths: the front cloud drifts
 * further and takes longer to reach its peak (it reads as closer, so it
 * feels heavier and slower), the back cloud makes a smaller, quicker trip
 * the opposite way — parallax in a still sky.
 * Base geometry: Lucide `cloudy` (ISC).
 */
const DUR = 1.4

export function CloudyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloudy'}
      {...hoverProps}
    >
      <motion.path
        d="M17.5 12a1 1 0 1 1 0 9H9.006a7 7 0 1 1 6.702-9z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.6, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M21.832 9A3 3 0 0 0 19 7h-2.207a5.5 5.5 0 0 0-10.72.61"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.62], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cloudy',
  gesture: 'the layers drift',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'overcast'],
}

export default CloudyIcon
