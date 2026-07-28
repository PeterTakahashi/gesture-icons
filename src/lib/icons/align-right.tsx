import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Align right — mirror of align-left. The two shorter lines nudge a hair
 * left (winding up), then right past the margin, then settle home,
 * staggered top-down; the full-width line stays put.
 * Base geometry: Lucide `align-right` (ISC).
 */
const DUR = 0.8

function nudgeRight(delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, -0.6, 2.4, 0],
      transition: { duration: DUR, delay, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
    },
  }
}

export function AlignRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'align right'}
      {...hoverProps}
    >
      <path d="M21 5H3" />
      <motion.path d="M21 12H9" initial="normal" animate={controls} variants={nudgeRight(0)} />
      <motion.path d="M21 19H7" initial="normal" animate={controls} variants={nudgeRight(DUR * 0.05)} />
    </svg>
  )
}

export const meta = {
  name: 'align-right',
  gesture: 'the lines snap right',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['format', 'paragraph'],
}

export default AlignRightIcon
