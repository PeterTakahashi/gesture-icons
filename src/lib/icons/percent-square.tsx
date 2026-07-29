import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Percent square — the inner mark performs its own verb inside a still
 * frame: the slash and its two dots STAMP together, same press-twist-pop
 * as dollar-sign.tsx, while the frame takes one small breath.
 * VARIANT(percent-diamond).
 * Base geometry: Lucide `percent-square` (ISC).
 */
const DUR = 0.8

export function PercentSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'percent square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeOutQuart },
          },
        }}
      />
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
        <path d="m15 9-6 6" />
        <path d="M9 9h.01" />
        <path d="M15 15h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'percent-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['frame', 'mark', 'percent', 'square'],
}

export default PercentSquareIcon
