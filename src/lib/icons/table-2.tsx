import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Table 2 — data takes its places. Lucide draws this table's frame and both
 * dividers as one continuous path, so there is no single row to nudge
 * without cutting the geometry apart — the frame must hold still. The
 * honest stand-in: a small marker pops through each cell in reading order
 * and is gone.
 * Base geometry: Lucide `table-2` (ISC).
 */
const DUR = 0.95
const CELLS: Array<[number, number, number]> = [
  [6, 5, 0],
  [15, 5, 0.09],
  [6, 19, 0.18],
  [15, 19, 0.27],
]

function pop(delay: number): Variants {
  return {
    normal: { scale: 0.001 },
    animate: {
      scale: [0.001, 1.3, 1, 1, 0.001],
      transition: { duration: DUR, delay, times: [0, 0.28, 0.42, 0.66, 0.8], ease: [settleBack, easeOutQuart, 'linear', easeOutQuart] },
    },
  }
}

export function Table2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'table 2'}
      {...hoverProps}
    >
      <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18" />
      {CELLS.map(([cx, cy, delay]) => (
        <motion.circle
          key={`${cx}-${cy}`}
          cx={cx} cy={cy} r={1.1}
          fill={color === 'currentColor' ? 'currentColor' : color}
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={pop(delay)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'table-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['table', 'data', 'board'],
}

export default Table2Icon
