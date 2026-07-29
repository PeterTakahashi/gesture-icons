import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Squares subtract — the two shapes part. The result (the notched square
 * left over) holds still — it's already been cut — while the subtracted
 * square's remaining corners nudge further away along the diagonal it was
 * pulled out on, then settle back exactly where drawn.
 * Base geometry: Lucide `squares-subtract` (ISC).
 */
const DUR = 0.9

export function SquaresSubtractIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squares subtract'}
      {...hoverProps}
    >
      <path d="M16 4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-5a2 2 0 0 1 2-2h5a1 1 0 0 0 1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1.06, 0],
            y: [0, -0.3, 1.06, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 22a2 2 0 0 1-2-2" />
        <path d="M16 22h-2" />
        <path d="M20 8a2 2 0 0 1 2 2" />
        <path d="M22 14v2" />
        <path d="M22 20a2 2 0 0 1-2 2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'squares-subtract',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['boolean', 'layers', 'combine', 'squares', 'subtract'],
}

export default SquaresSubtractIcon
