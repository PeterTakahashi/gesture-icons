import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * User pen — the pen mark performs its own verb; the person holds still,
 * the same "one actor" choice as user-x.tsx. The pen writes, tip-pivoted at
 * the point of its blade (~13, 22) with a small x/y jot, same language as
 * edit.tsx.
 * Base geometry: Lucide `user-pen` (ISC).
 */
const DUR = 0.85

export function UserPenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user pen'}
      {...hoverProps}
    >
      <path d="M11.5 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <motion.path
        d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        style={{ transformBox: 'view-box', transformOrigin: '13.6px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'user-pen',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member', 'pen'],
}

export default UserPenIcon
