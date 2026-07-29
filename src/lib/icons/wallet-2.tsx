import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wallet 2 — the snap gets pressed. The dot is the wallet's clasp, so it
 * takes the stamp: a press down past its own size, a pop back with
 * overshoot — the click of the wallet being opened — while the body gives
 * the same subtle give as wallet.tsx, timed to the same click.
 * Base geometry: Lucide `wallet-2` (ISC).
 */
const DUR = 0.75

export function Wallet2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wallet 2'}
      {...hoverProps}
    >
      <motion.path
        d="M7 7h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.985, 1, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 1], ease: easeOutQuart },
          },
        }}
      />
      <motion.path
        d="M17 14h.01"
        style={{ transformBox: 'view-box', transformOrigin: '17px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.5, 1.35, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wallet-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'payment', 'wallet'],
}

export default Wallet2Icon
