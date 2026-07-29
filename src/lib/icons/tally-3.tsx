import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Tally 3 — it counts itself out loud. Each stroke erases then pen-redraws
 * in counting order, left to right, 80ms apart, so the mark reads as being
 * made one at a time rather than appearing all at once.
 * Base geometry: Lucide `tally-3` (ISC).
 */
const DUR = 0.85
const STEP = 0.08

const stroke = (delay: number): Variants => ({
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.001, 0.001, 1],
    transition: { duration: DUR, delay, times: [0, 0.25, 0.4, 0.85], ease: [easeInCubic, 'linear', pen] },
  },
})

export function Tally3Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tally 3'}
      {...hoverProps}
    >
      <motion.path d="M4 4v16" initial="normal" animate={controls} variants={stroke(0)} />
      <motion.path d="M9 4v16" initial="normal" animate={controls} variants={stroke(STEP)} />
      <motion.path d="M14 4v16" initial="normal" animate={controls} variants={stroke(2 * STEP)} />
    </svg>
  )
}

export const meta = {
  name: 'tally-3',
  gesture: 'it counts itself out loud',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['count', 'score', 'tally'],
}

export default Tally3Icon
