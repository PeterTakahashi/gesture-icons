import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { gravity, pen } from '../core/easings'

/**
 * Shower head — it rains down. Each droplet mark is its own dash-hidden dot;
 * they draw in top-to-bottom order (a 50ms stagger per drop, gravity ease so
 * each looks like it is falling into existence) then erase in that same
 * top-down order — one burst of water. The head and arm never move.
 * Base geometry: Lucide `shower-head` (ISC).
 */
const DUR = 0.9
// top-to-bottom draw order, read off the drops' own y coordinates
const DROPS = [
  { d: 'M16 10v.01', delay: 0 },
  { d: 'M20 11v.01', delay: 0.05 },
  { d: 'M13 13v.01', delay: 0.1 },
  { d: 'M17 14v.01', delay: 0.15 },
  { d: 'M10 16v.01', delay: 0.2 },
  { d: 'M14 17v.01', delay: 0.25 },
  { d: 'M11 20v.01', delay: 0.3 },
]

export function ShowerHeadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shower head'}
      {...hoverProps}
    >
      <path d="m4 4 2.5 2.5" />
      <path d="M13.5 6.5a4.95 4.95 0 0 0-7 7" />
      <path d="M15 5 5 15" />
      {DROPS.map((drop) => (
        <motion.path
          key={drop.d}
          d={drop.d}
          pathLength={1}
          strokeDasharray="1.02"
          initial="normal"
          animate={controls}
          variants={{
            normal: { strokeDashoffset: 1.02 },
            animate: {
              strokeDashoffset: [1.02, 0, 0, 1.02],
              transition: {
                duration: DUR,
                delay: drop.delay,
                times: [0, 0.2, 0.5, 0.7],
                ease: [gravity, 'linear', pen],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'shower-head',
  gesture: 'it rains down',
  family: 'draw-on' as const,
  section: 'Home',
  tags: ['bathroom', 'water'],
}

export default ShowerHeadIcon
