import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pentagon — it turns a face. A pentagon is 5-fold symmetric, so a 72°
 * rotation is a free landing: a small wind-up against the turn, the turn
 * with a touch of overshoot, then a settle onto Lucide's original pixels.
 * Base geometry: Lucide `pentagon` (ISC).
 */
const DUR = 0.85
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function PentagonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pentagon'}
      {...hoverProps}
    >
      <motion.path
        d="M10.83 2.38a2 2 0 0 1 2.34 0l8 5.74a2 2 0 0 1 .73 2.25l-3.04 9.26a2 2 0 0 1-1.9 1.37H7.04a2 2 0 0 1-1.9-1.37L2.1 10.37a2 2 0 0 1 .73-2.25z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 80, 72],
            transition: { duration: DUR, times: [0, 0.16, 0.78, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'pentagon',
  gesture: 'it turns a face',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'geometry'],
}

export default PentagonIcon
