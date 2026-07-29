import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * User x 2 — access denied. Only the X shakes no — a decaying rotation
 * about its own center, same language as user-x.tsx — while the person
 * holds perfectly still.
 * Base geometry: Lucide `user-x-2` (ISC).
 */
const DUR = 0.85

export function UserX2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user x 2'}
      {...hoverProps}
    >
      <path d="M2 21a8 8 0 0 1 11.873-7" />
      <circle cx="10" cy="8" r="5" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19.5px 19.5px' }}
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
        <path d="m17 17 5 5" />
        <path d="m22 17-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-x-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member'],
}

export default UserX2Icon
