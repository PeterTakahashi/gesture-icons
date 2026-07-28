import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wallet — it opens to pay. The coin-pocket edge nudges out a hair, as if a
 * card were being drawn from the slot, then tucks back in; the body takes a
 * subtle press at the same beat, the way a wallet gives under a thumb.
 * Base geometry: Lucide `wallet` (ISC).
 */
const DUR = 0.85

export function WalletIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wallet'}
      {...hoverProps}
    >
      {/* body: takes the subtle press */}
      <motion.path
        d="M3 5v14a2 2 0 0 0 2 2h15a1 1 0 0 0 1-1v-4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.985, 1, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 1], ease: easeOutQuart },
          },
        }}
      />
      {/* the card-slot edge peeks out and tucks back */}
      <motion.path
        d="M19 7V4a1 1 0 0 0-1-1H5a2 2 0 0 0 0 4h15a1 1 0 0 1 1 1v4h-3a2 2 0 0 0 0 4h3a1 1 0 0 0 1-1v-2a1 1 0 0 0-1-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wallet',
  gesture: 'it opens to pay',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'payment'],
}

export default WalletIcon
