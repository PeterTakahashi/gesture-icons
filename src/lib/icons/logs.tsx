import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Logs — it does what it means. Each row (the two bullet dots and the log
 * line that share its y) nudges right and settles, top to bottom, 6% of
 * the beat apart — entries landing in their place one after another.
 * Base geometry: Lucide `logs` (ISC).
 */
const DUR = 0.85
const ROWS = [
  { y: 5, dots: ['M3 5h1', 'M8 5h1'], line: 'M13 5h8' },
  { y: 12, dots: ['M3 12h1', 'M8 12h1'], line: 'M13 12h8' },
  { y: 19, dots: ['M3 19h1', 'M8 19h1'], line: 'M13 19h8' },
]

function nudge(delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, 1.2, 1.2, 0],
      transition: { duration: DUR, delay, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
    },
  }
}

export function LogsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'logs'}
      {...hoverProps}
    >
      {ROWS.map((row, i) => (
        <motion.g key={row.y} initial="normal" animate={controls} variants={nudge(i * 0.055)}>
          {row.dots.map((d) => (
            <path key={d} d={d} />
          ))}
          <path d={row.line} />
        </motion.g>
      ))}
    </svg>
  )
}

export const meta = {
  name: 'logs',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['table', 'data', 'board', 'logs'],
}

export default LogsIcon
