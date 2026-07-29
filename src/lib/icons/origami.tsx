import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Origami — the crane bows. The head/neck fold (the thin point running up
 * from the body crease at (12,12)) dips forward, while the long wing
 * crease lifts a hair the opposite way — a small counterbalance, the way
 * a paper crane's fold gives when you tip it. The outer body silhouette
 * holds its shape; paper doesn't bend, it only pivots at its creases.
 * Base geometry: Lucide `origami` (ISC).
 */
const DUR = 1.0

export function OrigamiIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'origami'}
      {...hoverProps}
    >
      <motion.path
        d="M12 12V4a1 1 0 0 1 1-1h6.297a1 1 0 0 1 .651 1.759l-4.696 4.025"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 5, 0],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="m12 21-7.414-7.414A2 2 0 0 1 4 12.172V6.415a1.002 1.002 0 0 1 1.707-.707L20 20.009"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 0],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="m12.214 3.381 8.414 14.966a1 1 0 0 1-.167 1.199l-1.168 1.163a1 1 0 0 1-.706.291H6.351a1 1 0 0 1-.625-.219L3.25 18.8a1 1 0 0 1 .631-1.781l4.165.027" />
    </svg>
  )
}

export const meta = {
  name: 'origami',
  gesture: 'the crane bows',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['paper', 'craft', 'japan', 'origami'],
}

export default OrigamiIcon
