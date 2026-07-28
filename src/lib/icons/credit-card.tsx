import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Credit card — it swipes. A pull-back and a fast rightward swipe with a
 * slight tilt, then it levels out and returns — the stripe rides along in
 * the same group because it never moves independently of the card.
 * Base geometry: Lucide `credit-card` (ISC).
 */
const DUR = 0.95

export function CreditCardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'credit card'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -2, 6, 0],
            rotate: [0, -3, 1, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.52, 1], ease: [easeInOutCubic, easeInCubic, easeOutQuart] },
          },
        }}
      >
        <rect width="20" height="14" x="2" y="5" rx="2" />
        <line x1="2" x2="22" y1="10" y2="10" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'credit-card',
  gesture: 'it swipes',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['payment', 'pay', 'card', 'money'],
}

export default CreditCardIcon
