import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity } from '../core/easings'

/**
 * Cloud snow — a flurry passes through. The cloud dips as it lets go, and
 * each flake genuinely falls out through the frame's own bottom edge, is
 * repositioned above the cloud while nobody is looking (SVG overflow does
 * the hiding, never opacity), and drops back into its drawn resting spot —
 * staggered so it reads as a flurry rather than six flakes in lockstep.
 * Base geometry: Lucide `cloud-snow` (ISC).
 */
const DUR = 1.15

const FLAKES = [
  { d: 'M8 15h.01', delay: 0 },
  { d: 'M16 15h.01', delay: 0.04 },
  { d: 'M12 17h.01', delay: 0.08 },
  { d: 'M8 19h.01', delay: 0.14 },
  { d: 'M16 19h.01', delay: 0.18 },
  { d: 'M12 21h.01', delay: 0.22 },
]

export function CloudSnowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud snow'}
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
      {FLAKES.map((f) => (
        <motion.path
          key={f.d}
          d={f.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              // falls out the bottom edge, is put back above the cloud while
              // genuinely off-frame, falls back into its resting spot
              y: [0, 10, 10, -24, -24, 0],
              transition: {
                duration: DUR,
                delay: f.delay,
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
  name: 'cloud-snow',
  gesture: 'a flurry passes through',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'cloud', 'snow'],
}

export default CloudSnowIcon
