import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity } from '../core/easings'

/**
 * Cloud drizzle — VARIANT(cloud-rain): it drizzles. The cloud barely
 * reacts, and the six short mist-ticks fall through the frame's own bottom
 * edge, are repositioned above the cloud while genuinely off-frame, and
 * settle back — lighter and more tightly staggered than `cloud-rain`'s
 * three full drops, since this is mist, not a storm.
 * Base geometry: Lucide `cloud-drizzle` (ISC).
 */
const DUR = 0.95

const TICKS = [
  { d: 'M8 19v1', delay: 0 },
  { d: 'M16 19v1', delay: 0.02 },
  { d: 'M8 14v1', delay: 0.04 },
  { d: 'M12 21v1', delay: 0.06 },
  { d: 'M16 14v1', delay: 0.08 },
  { d: 'M12 16v1', delay: 0.1 },
]

export function CloudDrizzleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud drizzle'}
      {...hoverProps}
    >
      <motion.path
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.26], ease: easeInOutCubic },
          },
        }}
      />
      {TICKS.map((tick) => (
        <motion.path
          key={tick.d}
          d={tick.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 10, 10, -16, -16, 0],
              transition: {
                duration: DUR,
                delay: tick.delay,
                times: [0, 0.34, 0.42, 0.42, 0.5, 1],
                ease: [gravity, 'linear', 'linear', 'linear', gravity],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'cloud-drizzle',
  gesture: 'it drizzles',
  family: 'travel' as const,
  section: 'Nature',
  tags: ['weather', 'rain', 'light'],
}

export default CloudDrizzleIcon
