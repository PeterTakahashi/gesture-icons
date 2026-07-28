import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Corner down-left — it takes the turn. Shrinking pathLength un-draws from
 * the far end first, so both strokes erase from the arrowhead backward.
 * Then the corner line pen-redraws along its own travel direction — down,
 * into the curve, then left — and the arrowhead redraws last, landing right
 * as the line's pen arrives at it.
 * Base geometry: Lucide `corner-down-left` (ISC).
 */
const DUR = 1.05

export function CornerDownLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'corner down left'}
      {...hoverProps}
    >
      <motion.path
        d="M20 4v7a4 4 0 0 1-4 4H4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.28, 0.72], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="m9 10-5 5 5 5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.6, 1], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'corner-down-left',
  gesture: 'it takes the turn',
  family: 'draw-on' as const,
  section: 'Arrows',
  tags: ['corner', 'turn'],
}

export default CornerDownLeftIcon
