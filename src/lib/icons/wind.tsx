import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo } from '../core/easings'

/**
 * Wind — it gusts through. Each stream line drains away from its trailing
 * tip and writes itself back on, top line first — pathLength, never a fade —
 * and the curl at each line's head makes the redraw read as a swirl passing.
 * Base geometry: Lucide `wind` (ISC).
 */
const DUR = 0.95

const LINES = [
  { d: 'M9.8 4.4A2 2 0 1 1 11 8H2', delay: 0 },
  { d: 'M17.5 8a2.5 2.5 0 1 1 2 4H2', delay: 0.06 },
  { d: 'M12.8 19.6A2 2 0 1 0 14 16H2', delay: 0.12 },
]

export function WindIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wind'}
      {...hoverProps}
    >
      {LINES.map((line) => (
        <motion.path
          key={line.d}
          d={line.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: {
                duration: DUR,
                delay: line.delay,
                times: [0, 0.32, 0.42, 1],
                ease: [easeInCubic, 'linear', easeOutExpo],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'wind',
  gesture: 'it gusts through',
  family: 'draw-on' as const,
  section: 'Nature',
  tags: ['weather', 'air', 'breeze'],
}

export default WindIcon
