import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Tally 5 — it counts itself out loud. The four uprights erase then
 * pen-redraw left to right, 80ms apart, then the diagonal slashes across
 * last — the traditional fifth mark, closing the set of five.
 * Base geometry: Lucide `tally-5` (ISC).
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

export function Tally5Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tally 5'}
      {...hoverProps}
    >
      <motion.path d="M4 4v16" initial="normal" animate={controls} variants={stroke(0)} />
      <motion.path d="M9 4v16" initial="normal" animate={controls} variants={stroke(STEP)} />
      <motion.path d="M14 4v16" initial="normal" animate={controls} variants={stroke(2 * STEP)} />
      <motion.path d="M19 4v16" initial="normal" animate={controls} variants={stroke(3 * STEP)} />
      {/* the closing slash, drawn last as the count reaches five */}
      <motion.path d="M22 6 2 18" initial="normal" animate={controls} variants={stroke(4 * STEP)} />
    </svg>
  )
}

export const meta = {
  name: 'tally-5',
  gesture: 'it counts itself out loud',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['count', 'score', 'tally'],
}

export default Tally5Icon
