import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity } from '../core/easings'

/**
 * Cloud rain — it rains one shower. The cloud dips as it releases the
 * weight, then each drop falls straight through the frame's own bottom edge
 * (genuinely gone, not faded), is repositioned above the cloud while nobody
 * is looking, and falls back into its drawn resting position — staggered
 * so it reads as one passing shower rather than three drops in lockstep.
 * Base geometry: Lucide `cloud-rain` (ISC).
 */
const DUR = 1.1

const DROPS = [
  { d: 'M16 14v6', delay: 0 },
  { d: 'M8 14v6', delay: 0.08 },
  { d: 'M12 16v6', delay: 0.16 },
]

export function CloudRainIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud rain'}
      {...hoverProps}
    >
      <motion.path
        d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.26], ease: easeInOutCubic },
          },
        }}
      />
      {DROPS.map((drop) => (
        <motion.path
          key={drop.d}
          d={drop.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 14, 14, -20, -20, 0],
              transition: {
                duration: DUR,
                delay: drop.delay,
                times: [0, 0.4, 0.48, 0.48, 0.58, 1],
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
  name: 'cloud-rain',
  gesture: 'it rains one shower',
  family: 'travel' as const,
  section: 'Nature',
  tags: ['weather', 'rain', 'storm'],
}

export default CloudRainIcon
