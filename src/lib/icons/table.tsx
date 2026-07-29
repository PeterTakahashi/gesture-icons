import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Table — the rows cascade. Each row divider nudges forward and back, top
 * to bottom with a slight stagger — data settling into its rows — while the
 * frame and its column divider hold still.
 * Base geometry: Lucide `table` (ISC).
 */
const DUR = 0.85

function row(delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, -0.3, 1.2, 0],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function TableIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'table'}
      {...hoverProps}
    >
      <path d="M12 3v18" />
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M3 9h18" initial="normal" animate={controls} variants={row(0)} />
      <motion.path d="M3 15h18" initial="normal" animate={controls} variants={row(0.05)} />
    </svg>
  )
}

export const meta = {
  name: 'table',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['table', 'data', 'board'],
}

export default TableIcon
