import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint } from '../core/easings'

/**
 * User star — it does what it means. The person holds — the star is the
 * one carrying the verb here. It gathers itself (ease-in, ~5-fold
 * symmetric so the turn is free) and blooms back through 72°, per
 * `star.tsx`, landing on a picture identical to rest.
 * Base geometry: Lucide `user-star` (ISC).
 */
export function UserStarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user star'}
      {...hoverProps}
    >
      <path d="M8 15H7a4 4 0 0 0-4 4v2" />
      <circle cx="10" cy="7" r="4" />
      <motion.path
        d="M16.051 12.616a1 1 0 0 1 1.909.024l.737 1.452a1 1 0 0 0 .737.535l1.634.256a1 1 0 0 1 .588 1.806l-1.172 1.168a1 1 0 0 0-.282.866l.259 1.613a1 1 0 0 1-1.541 1.134l-1.465-.75a1 1 0 0 0-.912 0l-1.465.75a1 1 0 0 1-1.539-1.133l.258-1.613a1 1 0 0 0-.282-.866l-1.156-1.153a1 1 0 0 1 .572-1.822l1.633-.256a1 1 0 0 0 .737-.535z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.55, 1.14, 1],
            rotate: [0, -22, 50, 72],
            transition: {
              duration: 0.9,
              times: [0, 0.3, 0.66, 1],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, [0.34, 1.3, 0.64, 1]],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'user-star',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member', 'star'],
}

export default UserStarIcon
