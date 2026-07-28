import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Square — it sits square. A stamp: pressed down a touch, popped past its
 * own size, and set down — square, the way it started.
 * Base geometry: Lucide `square` (ISC).
 */
const DUR = 0.7

export function SquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.94, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'square',
  gesture: 'it sits square',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'geometry'],
}

export default SquareIcon
