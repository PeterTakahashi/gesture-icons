import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Reply all — everyone hears back. Both arrows nudge left together — the
 * line and the near arrowhead on one clock, the far arrowhead a beat (6% of
 * the duration) behind — reply, and reply again.
 * Base geometry: Lucide `reply-all` (ISC).
 */
const DUR = 0.8

export function ReplyAllIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'reply all'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -2.5, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.46, 0.78, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="m12 17-5-5 5-5" />
        <path d="M22 18v-2a4 4 0 0 0-4-4H7" />
      </motion.g>
      <motion.path
        d="m7 17-5-5 5-5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -2.5, -2.5, 0],
            transition: { duration: DUR, delay: 0.054, times: [0, 0.18, 0.46, 0.78, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'reply-all',
  gesture: 'everyone hears back',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['respond', 'email', 'group'],
}

export default ReplyAllIcon
