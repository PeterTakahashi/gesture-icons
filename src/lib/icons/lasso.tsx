import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Lasso — it makes its move. The loop itself holds still; only the drag
 * handle (the little circle and the tail it hangs from) NUDGEs further
 * outward, away from the loop, the way a control point tugs before it
 * settles back onto its anchor.
 * Base geometry: Lucide `lasso` (ISC).
 */
const DUR = 0.8
// direction from the loop's rough center toward the handle: down-left
const UX = -0.55
const UY = 0.83
const WIND = 0.4
const DRIVE = 1.5

export function LassoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lasso'}
      {...hoverProps}
    >
      <path d="M3.704 14.467a10 8 0 1 1 3.115 2.375" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * UX, DRIVE * UX, 0],
            y: [0, -WIND * UY, DRIVE * UY, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M7 22a5 5 0 0 1-2-3.994" />
        <circle cx="5" cy="16" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'lasso',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'lasso'],
}

export default LassoIcon
