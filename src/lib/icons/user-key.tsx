import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * User key — the key mark performs its own verb; the person holds still,
 * the same "one actor" choice as user-x.tsx. The key turns about its own
 * ring (its bow), same pun as key.tsx: a small counter-grip wind-up, the
 * turn past its mark, a held beat, then back home.
 * Base geometry: Lucide `user-key` (ISC).
 */
const DUR = 1.05

export function UserKeyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user key'}
      {...hoverProps}
    >
      <path d="M3 21v-2a4 4 0 0 1 4-4h6a4 4 0 0 1 2.072.578" />
      <circle cx="10" cy="7" r="4" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '20px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 80, 80, -4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M20 11v6" />
        <path d="M20 13h2" />
        <circle cx="20" cy="19" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-key',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member', 'key'],
}

export default UserKeyIcon
