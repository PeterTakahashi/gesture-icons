import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * User 2 — it bows. This Lucide glyph is a full alternate single-person
 * silhouette rather than "user" plus a literal "2" mark, so per the
 * template's menu the honest move is the same dignified bow user.tsx
 * performs on its own silhouette: head and shoulders tip forward together
 * about the base, hold a beat, and straighten back up.
 * Base geometry: Lucide `user-2` (ISC).
 */
const DUR = 1.0

export function User2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user 2'}
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
        <circle cx="12" cy="8" r="5" />
        <path d="M20 21a8 8 0 0 0-16 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-2',
  gesture: 'it bows',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member'],
}

export default User2Icon
