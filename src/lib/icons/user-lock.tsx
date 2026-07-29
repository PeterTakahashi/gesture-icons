import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * User lock — it is locked. The mini shackle lifts clear of the body, holds
 * a beat open, then drops shut with gravity; the lock body takes the hit
 * exactly on the contact frame and settles back flat, per `lock.tsx`
 * scaled down. The person underneath holds completely still.
 * Base geometry: Lucide `user-lock` (ISC).
 */
const DUR = 1.0

export function UserLockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user lock'}
      {...hoverProps}
    >
      <path d="M9.5 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <motion.path
        d="M19 16v-2a2 2 0 0 0-4 0v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.85], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        x="13" y="16" width="8" height="5" rx=".899"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 0.85, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'user-lock',
  gesture: 'it is locked',
  family: 'rigid' as const,
  section: 'People',
  tags: ['secure', 'private', 'user', 'lock'],
}

export default UserLockIcon
