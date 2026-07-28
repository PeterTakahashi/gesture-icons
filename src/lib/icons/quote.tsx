import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Quote — the two marks lift and tilt as if raised to speak, left mark
 * first, right mark a beat after, each settling back to its printed
 * place.
 * Base geometry: Lucide `quote` (ISC).
 */
const DUR = 0.9

function lift(delay: number): Variants {
  return {
    normal: { y: 0, rotate: 0 },
    animate: {
      y: [0, -1.5, -1.5, 0],
      rotate: [0, -4, -4, 0],
      transition: { duration: DUR, delay, times: [0, 0.28, 0.62, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
    },
  }
}

export function QuoteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'quote'}
      {...hoverProps}
    >
      <motion.path
        d="M5 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={lift(0)}
      />
      <motion.path
        d="M16 3a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2 1 1 0 0 1 1 1v1a2 2 0 0 1-2 2 1 1 0 0 0-1 1v2a1 1 0 0 0 1 1 6 6 0 0 0 6-6V5a2 2 0 0 0-2-2z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls} variants={lift(DUR * 0.08)}
      />
    </svg>
  )
}

export const meta = {
  name: 'quote',
  gesture: 'it opens a quotation',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['blockquote', 'citation'],
}

export default QuoteIcon
