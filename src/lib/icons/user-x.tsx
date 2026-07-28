import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * User x — access denied. Only the x shakes "no" — a decaying rotation
 * about its own center — while the person holds perfectly still.
 * Base geometry: Lucide `user-x` (ISC).
 */
const DUR = 0.85

export function UserXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user x'}
      {...hoverProps}
    >
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19.5px 10.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <line x1="17" x2="22" y1="8" y2="13" />
        <line x1="22" x2="17" y1="8" y2="13" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-x',
  gesture: 'access denied',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['remove', 'block', 'deny'],
}

export default UserXIcon
