import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * User — it bows. A small, dignified bow about the base — head and
 * shoulders tip forward together, hold a beat, and straighten back up.
 * Base geometry: Lucide `user` (ISC).
 */
const DUR = 1.0

export function UserIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 7, 7, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.66, 0.92], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user',
  gesture: 'it bows',
  family: 'rigid' as const,
  section: 'People',
  tags: ['person', 'profile', 'account', 'avatar'],
}

export default UserIcon
