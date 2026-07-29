import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mail minus — one is removed. VARIANT: only the minus bar moves — a small
 * wind-up toward the envelope, then escorted away and settled back to its
 * resting mark. The envelope itself holds still.
 * Base geometry: Lucide `mail-minus` (ISC).
 */
const DUR = 0.9

export function MailMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail minus'}
      {...hoverProps}
    >
      <path d="M22 15V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      <motion.path
        d="M16 19h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.5, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mail-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['remove', 'mail', 'minus'],
}

export default MailMinusIcon
