import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Align left — the ragged lines snap to the left margin. The full-width
 * top line is already flush, so only the two shorter lines nudge: a hair
 * right (winding up), then left past the margin, then settle home —
 * staggered top-down so the snap reads as a ripple, not a block move.
 * Base geometry: Lucide `align-left` (ISC).
 */
const DUR = 0.8

function nudgeLeft(delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, 0.6, -2.4, 0],
      transition: { duration: DUR, delay, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
    },
  }
}

export function AlignLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'align left'}
      {...hoverProps}
    >
      <path d="M21 5H3" />
      <motion.path d="M15 12H3" initial="normal" animate={controls} variants={nudgeLeft(0)} />
      <motion.path d="M17 19H3" initial="normal" animate={controls} variants={nudgeLeft(DUR * 0.05)} />
    </svg>
  )
}

export const meta = {
  name: 'align-left',
  gesture: 'the lines snap left',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['format', 'paragraph'],
}

export default AlignLeftIcon
