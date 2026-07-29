import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, pen } from '../core/easings'

/**
 * Squares unite — it draws together. Lucide draws the union as a single
 * merged outline, so there are no two shapes left to move into each other —
 * the honest verb left is DRAW: the merged outline erases and pen-redraws,
 * standing in for the union completing.
 * Base geometry: Lucide `squares-unite` (ISC).
 */
const DUR = 0.95

export function SquaresUniteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squares unite'}
      {...hoverProps}
    >
      <motion.path
        d="M4 16a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3a1 1 0 0 0 1 1h3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H10a2 2 0 0 1-2-2v-3a1 1 0 0 0-1-1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.1, 0.4, 0.92], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'squares-unite',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['boolean', 'layers', 'combine', 'squares', 'unite'],
}

export default SquaresUniteIcon
