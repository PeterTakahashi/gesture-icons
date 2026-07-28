import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Underline — it underscores the point. The rule erases, then a pen
 * redraws it left to right; the U above takes a small landing dip exactly
 * as the stroke completes, the way a hand presses down when it finishes
 * a line, then lifts back off.
 * Base geometry: Lucide `underline` (ISC).
 */
const DUR = 0.9

export function UnderlineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'underline'}
      {...hoverProps}
    >
      <motion.path
        d="M6 4v6a6 6 0 0 0 12 0V4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.82, 0.92, 1], ease: 'easeOut' },
          },
        }}
      />
      <motion.line
        x1="4" x2="20" y1="20" y2="20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.45, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'underline',
  gesture: 'it underscores the point',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['font', 'format'],
}

export default UnderlineIcon
