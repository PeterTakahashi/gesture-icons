import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Dessert — it wobbles. The dome squashes and stretches on counter-phase
 * axes — gelatin physics, scaleX and scaleY trading places — twice about
 * the plate it sits on; the plate itself never moves.
 * Base geometry: Lucide `dessert` (ISC).
 */
const DUR = 1.0

export function DessertIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dessert'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1, scaleY: 1 },
          animate: {
            scaleX: [1, 1.05, 0.96, 1.05, 0.96, 1],
            scaleY: [1, 0.96, 1.05, 0.96, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10.162 3.167A10 10 0 0 0 2 13a2 2 0 0 0 4 0v-1a2 2 0 0 1 4 0v4a2 2 0 0 0 4 0v-4a2 2 0 0 1 4 0v1a2 2 0 0 0 4-.006 10 10 0 0 0-8.161-9.826" />
        <circle cx="12" cy="4" r="2" />
      </motion.g>
      <path d="M20.804 14.869a9 9 0 0 1-17.608 0" />
    </svg>
  )
}

export const meta = {
  name: 'dessert',
  gesture: 'it wobbles',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['pudding', 'sweet', 'jelly', 'dessert'],
}

export default DessertIcon
