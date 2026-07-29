import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Indian rupee — it rings up. Same stamp-with-a-turn as dollar-sign.tsx:
 * press, twist a hair, pop past size, settle — the till closing on a sale.
 * Base geometry: Lucide `indian-rupee` (ISC).
 */
const DUR = 0.7

export function IndianRupeeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'indian rupee'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.9, 1.12, 1],
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M6 3h12" />
        <path d="M6 8h12" />
        <path d="m6 13 8.5 8" />
        <path d="M6 13h3" />
        <path d="M9 13c6.667 0 6.667-10 0-10" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'indian-rupee',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'indian', 'rupee'],
}

export default IndianRupeeIcon
