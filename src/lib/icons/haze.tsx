import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Haze — the air thickens. The sun's rays hold still; the three haze lines
 * below it — the shimmer arc and the two long bands — each nudge sideways,
 * alternating direction, staggered by a beat, and settle back: heat
 * shimmer rippling under a fixed sun.
 * Base geometry: Lucide `haze` (ISC).
 */
const DUR = 0.9

const LINES = [
  { d: 'M16 13a4 4 0 0 0-8 0', dir: 1, delay: 0 },
  { d: 'M22 17H2', dir: -1, delay: 0.05 },
  { d: 'M22 21H2', dir: 1, delay: 0.1 },
]

export function HazeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'haze'}
      {...hoverProps}
    >
      <path d="m5.2 6.2 1.4 1.4" />
      <path d="M2 13h2" />
      <path d="M20 13h2" />
      <path d="m17.4 7.6 1.4-1.4" />
      <path d="M12 5V2.5" />
      {LINES.map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, -0.4 * l.dir, 1.5 * l.dir, 0],
              transition: { duration: DUR, delay: l.delay, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'haze',
  gesture: 'the air thickens',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'fog', 'smog'],
}

export default HazeIcon
