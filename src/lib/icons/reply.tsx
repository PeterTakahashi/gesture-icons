import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Reply — it goes back. The whole arrow nudges along its own bend — a small
 * wind-up right, then a drive left and down the curve — before settling
 * back exactly where Lucide drew it.
 * Base geometry: Lucide `reply` (ISC).
 */
const DUR = 0.8

export function ReplyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'reply'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.6, -2.5, -2.5, 0],
            y: [0, 0, 0.4, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.46, 0.78, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M20 18v-2a4 4 0 0 0-4-4H4" />
        <path d="m9 17-5-5 5-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'reply',
  gesture: 'it goes back',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['respond', 'email', 'return'],
}

export default ReplyIcon
