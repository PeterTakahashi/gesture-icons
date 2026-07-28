import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Hexagon — it turns a face. A hexagon is 6-fold symmetric, so a 60°
 * rotation is a free landing: a small counter wind-up, the turn, a slight
 * overshoot, then a settle onto the identical picture Lucide drew.
 * Base geometry: Lucide `hexagon` (ISC).
 */
const DUR = 0.85
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function HexagonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hexagon'}
      {...hoverProps}
    >
      <motion.path
        d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 66, 60],
            transition: { duration: DUR, times: [0, 0.16, 0.78, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'hexagon',
  gesture: 'it turns a face',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'geometry'],
}

export default HexagonIcon
