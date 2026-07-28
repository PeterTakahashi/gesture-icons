import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tree pine — it shrugs off snow. The tiered canopy dips a hair as the load
 * releases, then shakes rapidly about the trunk base, decaying to a stop.
 * The trunk itself never moves.
 * Base geometry: Lucide `tree-pine` (ISC).
 */
const DUR = 0.65

export function TreePineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tree pine'}
      {...hoverProps}
    >
      <motion.path
        d="m17 14 3 3.3a1 1 0 0 1-.7 1.7H4.7a1 1 0 0 1-.7-1.7L7 14h-.3a1 1 0 0 1-.7-1.7L9 9h-.2A1 1 0 0 1 8 7.3L12 3l4 4.3a1 1 0 0 1-.8 1.7H15l3 3.3a1 1 0 0 1-.7 1.7H17Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -2.7, 2.5, -2, 1.4, -0.7, 0],
            y: [0, 0.6, 0.15, 0, 0, 0, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M12 22v-3" />
    </svg>
  )
}

export const meta = {
  name: 'tree-pine',
  gesture: 'it shrugs off snow',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['forest', 'winter'],
}

export default TreePineIcon
