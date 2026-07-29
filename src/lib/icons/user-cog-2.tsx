import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import type { Bezier } from '../core/easings'
import { easeInOutCubic } from '../core/easings'

/**
 * User cog 2 — it does what it means. VARIANT(user): the person holds
 * (nothing in this glyph gives an honest bow hinge) while the cog-2 badge
 * turns — wind-up then a drive, released back to rest rather than
 * free-landed, since the compound tooth paths don't give a confident
 * fold-symmetry to land on.
 * Base geometry: Lucide `user-cog-2` (ISC).
 */
const DUR = 0.9
const OVERSHOOT_TURN: Bezier = [0.5, 0, 0.3, 1.15]

export function UserCog2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user cog 2'}
      {...hoverProps}
    >
      <path d="M2 21a8 8 0 0 1 10.434-7.62" />
      <circle cx="10" cy="8" r="5" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 22, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, OVERSHOOT_TURN, easeInOutCubic] },
          },
        }}
      >
        <path d="m14.305 19.53.923-.382" />
        <path d="m15.228 16.852-.923-.383" />
        <path d="m16.852 15.228-.383-.923" />
        <path d="m16.852 20.772-.383.924" />
        <path d="m19.148 15.228.383-.923" />
        <path d="m19.53 21.696-.382-.924" />
        <path d="m20.772 16.852.924-.383" />
        <path d="m20.772 19.148.924.383" />
        <circle cx="18" cy="18" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-cog-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member', 'cog'],
}

export default UserCog2Icon
