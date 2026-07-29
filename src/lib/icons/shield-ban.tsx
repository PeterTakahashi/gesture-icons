import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Shield ban — it does what it means. VARIANT(shield): the shield gives
 * one firm brace (a pulse with overshoot) while the ban stroke shakes a
 * decaying "no" about its own midpoint, timed through the shield's settle.
 * Base geometry: Lucide `shield-ban` (ISC).
 */
const DUR = 1.0

export function ShieldBanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield ban'}
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
      <motion.path
        d="m4.243 5.21 14.39 12.472"
        style={{ transformBox: 'view-box', transformOrigin: '11.44px 11.45px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -4, 2, 0],
            transition: {
              duration: DUR * 0.65,
              delay: DUR * 0.35,
              times: [0, 0.18, 0.36, 0.56, 0.76, 1],
              ease: easeInOutCubic,
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'shield-ban',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['security', 'shield', 'ban'],
}

export default ShieldBanIcon
