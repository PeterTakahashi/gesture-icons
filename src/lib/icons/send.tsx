import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Send — the plane actually leaves. It departs along the axis its nose
 * already points (up-right), is genuinely gone past the frame edge, is
 * repositioned while nobody can see it, and arrives back on an ease-out.
 * Hiding by fading is banned. Hiding by leaving is honest.
 * Base geometry: Lucide `send` (ISC).
 */
export function SendIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'send'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            // 出発 → フレーム外（見えない間に反対側へ）→ 帰還
            x: [0, 27, 27, -27, -27, 0],
            y: [0, -27, -27, 27, 27, 0],
            transition: {
              duration: 1.2,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11z" />
        <path d="m21.854 2.147-10.94 10.939" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'send',
  gesture: 'the plane actually leaves',
  family: 'travel' as const,
  section: 'Communication',
  tags: ['plane', 'paper', 'message', 'submit'],
}

export default SendIcon
