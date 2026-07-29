import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * User cog — the cog mark performs its own verb; the person holds still, the
 * same "one actor" choice as user-x.tsx. The cog's eight teeth sit 45° apart,
 * so a one-tooth turn (wind-up, click past the mark, settle at 45°) lands on
 * a picture identical to rest — a free landing, same trick as cog.tsx's ring.
 * Base geometry: Lucide `user-cog` (ISC).
 */
const DUR = 0.9
const OVERSHOOT_TURN: [number, number, number, number] = [0.5, 0, 0.3, 1.15]

export function UserCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'user cog'}
      {...hoverProps}
    >
      <path d="M10 15H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 50, 45],
            transition: { duration: DUR, times: [0, 0.18, 0.6, 1], ease: [easeInOutCubic, OVERSHOOT_TURN, easeOutQuart] },
          },
        }}
      >
        <path d="m14.305 16.53.923-.382" />
        <path d="m15.228 13.852-.923-.383" />
        <path d="m16.852 12.228-.383-.923" />
        <path d="m16.852 17.772-.383.924" />
        <path d="m19.148 12.228.383-.923" />
        <path d="m19.53 18.696-.382-.924" />
        <path d="m20.772 13.852.924-.383" />
        <path d="m20.772 16.148.924.383" />
        <circle cx="18" cy="15" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'user-cog',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'People',
  tags: ['user', 'member', 'cog'],
}

export default UserCogIcon
