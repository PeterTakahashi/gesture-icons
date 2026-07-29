import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, easeInOutCubic } from '../core/easings'

/**
 * Baseline — the type sits the line. The letterform lifts a touch, then
 * drops and lands hard on the baseline; the line itself doesn't feel the
 * hit until the letter has actually arrived, so it flexes 3% later than
 * the landing frame, never before it.
 * Base geometry: Lucide `baseline` (ISC).
 */
const DUR = 0.85

export function BaselineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'baseline'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.26, 0.48, 0.72], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      >
        <path d="m6 16 6-12 6 12" />
        <path d="M8 12h8" />
      </motion.g>
      <motion.path
        d="M4 20h16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.74, 0.85, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'baseline',
  gesture: 'the type sits the line',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['typography', 'align', 'baseline'],
}

export default BaselineIcon
