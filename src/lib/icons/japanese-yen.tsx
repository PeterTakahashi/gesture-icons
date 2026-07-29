import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Japanese yen — it lands with intent. A stamp with a tiny twist, the same
 * beat as dollar-sign.tsx: the whole glyph presses down, twists a hair, and
 * pops past its own size before settling — the till closing on a sale.
 * Base geometry: Lucide `japanese-yen` (ISC).
 */
const DUR = 0.7

export function JapaneseYenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'japanese yen'}
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
        <path d="M12 9.5V21m0-11.5L6 3m6 6.5L18 3" />
        <path d="M6 15h12" />
        <path d="M6 11h12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'japanese-yen',
  gesture: 'it lands with intent',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['money', 'currency', 'japanese', 'yen'],
}

export default JapaneseYenIcon
