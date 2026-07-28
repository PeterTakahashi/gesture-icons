import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Radio tower — it transmits. The side signal arcs EMIT alternately —
 * the left pair erases and redraws first, the right pair a beat behind —
 * on every frequency. The mast, dot, and legs never move.
 * Base geometry: Lucide `radio-tower` (ISC).
 */
const DUR = 1.1

export function RadioTowerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const side = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.12, redrawStart, redrawEnd], ease: [easeInCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'radio tower'}
      {...hoverProps}
    >
      <motion.path d="M7.8 4.7a6.14 6.14 0 0 0-.8 7.5" initial="normal" animate={controls} variants={side(0.3, 0.58)} />
      <motion.path d="M4.9 16.1C1 12.2 1 5.8 4.9 1.9" initial="normal" animate={controls} variants={side(0.3, 0.58)} />
      <circle cx="12" cy="9" r="2" />
      <motion.path d="M16.2 4.8c2 2 2.26 5.11.8 7.47" initial="normal" animate={controls} variants={side(0.42, 0.72)} />
      <motion.path d="M19.1 1.9a9.96 9.96 0 0 1 0 14.1" initial="normal" animate={controls} variants={side(0.42, 0.72)} />
      <path d="M9.5 18h5" />
      <path d="m8 22 4-11 4 11" />
    </svg>
  )
}

export const meta = {
  name: 'radio-tower',
  gesture: 'it transmits',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['broadcast', 'signal', 'antenna'],
}

export default RadioTowerIcon
