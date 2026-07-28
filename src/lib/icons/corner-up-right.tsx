import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Corner up-right — it heads up and out. Both strokes erase from the
 * arrowhead backward, then the corner line pen-redraws up and into the
 * curve, and the arrowhead redraws last, landing as the line's pen arrives
 * at it.
 * Base geometry: Lucide `corner-up-right` (ISC).
 */
const DUR = 1.05

export function CornerUpRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'corner up right'}
      {...hoverProps}
    >
      <motion.path
        d="m15 14 5-5-5-5"
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
      <motion.path
        d="M4 20v-7a4 4 0 0 1 4-4h12"
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
    </svg>
  )
}

export const meta = {
  name: 'corner-up-right',
  gesture: 'it heads up and out',
  family: 'draw-on' as const,
  section: 'Arrows',
  tags: ['corner'],
}

export default CornerUpRightIcon
