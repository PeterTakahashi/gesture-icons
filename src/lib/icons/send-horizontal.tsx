import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Send horizontal — it fires off. The plane exits right along its own nose
 * (ease-in), is repositioned to the left while genuinely off-frame, and
 * glides back in level (ease-out) — sent.
 * Base geometry: Lucide `send-horizontal` (ISC).
 */
export function SendHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'send horizontal'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 27, 27, -27, -27, 0],
            transition: {
              duration: 1.2,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z" />
        <path d="M6 12h16" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'send-horizontal',
  gesture: 'it fires off',
  family: 'travel' as const,
  section: 'Communication',
  tags: ['submit', 'message', 'dm'],
}

export default SendHorizontalIcon
