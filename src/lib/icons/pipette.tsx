import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Pipette — it dips into the sample. The body slides along its own
 * diagonal toward the tip, holds a beat as if drawing liquid up, then
 * returns. The droplet mark at the tip is the fixed sample — it never
 * moves.
 * Base geometry: Lucide `pipette` (ISC).
 */
const DUR = 1.0

export function PipetteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pipette'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -1.3, -1.3, 0],
            y: [0, 1.4, 1.4, 0],
            rotate: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [gravity, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="m12 9-8.414 8.414A2 2 0 0 0 3 18.828v1.344a2 2 0 0 1-.586 1.414A2 2 0 0 1 3.828 21h1.344a2 2 0 0 0 1.414-.586L15 12" />
        <path d="m18 9 .4.4a1 1 0 1 1-3 3l-3.8-3.8a1 1 0 1 1 3-3l.4.4 3.4-3.4a1 1 0 1 1 3 3z" />
      </motion.g>
      <path d="m2 22 .414-.414" />
    </svg>
  )
}

export const meta = {
  name: 'pipette',
  gesture: 'it takes a sample',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['eyedropper', 'color'],
}

export default PipetteIcon
