import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import type { Bezier } from '../core/easings'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Shield cog — it does what it means. VARIANT(shield): the shield gives
 * one firm brace (a pulse with overshoot) while the cog turns — wind-up
 * then a drive, released back to rest rather than free-landed, since the
 * compound tooth paths don't give a confident fold-symmetry to land on.
 * Base geometry: Lucide `shield-cog` (ISC).
 */
const DUR = 1.0
const OVERSHOOT_TURN: Bezier = [0.5, 0, 0.3, 1.15]

export function ShieldCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield cog'}
      {...hoverProps}
    >
      <motion.path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.85], ease: settleBack },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12.077px 11.695px' }}
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
        <path d="m10.929 14.467-.383.924" />
        <path d="M10.929 8.923 10.546 8" />
        <path d="M13.225 8.923 13.608 8" />
        <path d="m13.607 15.391-.382-.924" />
        <path d="m14.772 10.852.923-.383" />
        <path d="m14.772 13.148.923.383" />
        <path d="m9.305 10.547-.923-.383" />
        <path d="m9.305 12.843-.923.383" />
        <circle cx="12.077" cy="11.695" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shield-cog',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['security', 'shield', 'cog'],
}

export default ShieldCogIcon
