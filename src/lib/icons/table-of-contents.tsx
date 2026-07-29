import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Table of contents — the entries cascade. Each row and its page marker
 * nudge forward together, top to bottom with a slight stagger — entries
 * confirming themselves in order.
 * Base geometry: Lucide `table-of-contents` (ISC).
 */
const DUR = 0.9
const ROWS: Array<[string, string, number]> = [
  ['M16 5H3', 'M21 5h.01', 0],
  ['M16 12H3', 'M21 12h.01', 0.05],
  ['M16 19H3', 'M21 19h.01', 0.1],
]

function row(delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, -0.3, 1.2, 0],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function TableOfContentsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'table of contents'}
      {...hoverProps}
    >
      {ROWS.map(([line, dot, delay]) => (
        <motion.g key={line} initial="normal" animate={controls} variants={row(delay)}>
          <path d={line} />
          <path d={dot} />
        </motion.g>
      ))}
    </svg>
  )
}

export const meta = {
  name: 'table-of-contents',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['table', 'data', 'board', 'contents'],
}

export default TableOfContentsIcon
