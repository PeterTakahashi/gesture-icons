import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * User minus — someone leaves. Only the minus bar moves: a small wind-up
 * inward, then nudged away as if escorted out, and settled back to its
 * resting mark. The person holds still.
 * Base geometry: Lucide `user-minus` (ISC).
 */
const DUR = 0.9

export function UserMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user minus'}
      {...hoverProps}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.line
        x1="22" x2="16" y1="11" y2="11"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.5, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'user-minus',
  gesture: 'someone leaves',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['remove', 'member'],
}

export default UserMinusIcon
