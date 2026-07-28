import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Repeat 2 — same mechanism as repeat, turned vertical. The top chevron
 * (pointing up, feeding the left rail) leaves off the top edge, wraps to
 * below the frame while genuinely out of view, and slides back up into
 * place; the bottom chevron mirrors it through the bottom edge. Same clock,
 * so they read as one lap of the vertical loop.
 * Base geometry: Lucide `repeat-2` (ISC).
 */
const DUR = 1.1
const HOP = 20

export function Repeat2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'repeat 2'}
      {...hoverProps}
    >
      {/* top-left chevron travels up off-frame, wraps below, slides back in */}
      <motion.path
        d="m2 9 3-3 3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -HOP, -HOP, HOP, HOP, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      />
      <path d="M13 18H7a2 2 0 0 1-2-2V6" />
      {/* bottom-right chevron travels down off-frame, wraps above, slides back in */}
      <motion.path
        d="m22 15-3 3-3-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, HOP, HOP, -HOP, -HOP, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      />
      <path d="M11 6h6a2 2 0 0 1 2 2v10" />
    </svg>
  )
}

export const meta = {
  name: 'repeat-2',
  gesture: 'it loops once more',
  family: 'travel' as const,
  section: 'Arrows',
  tags: ['loop', 'cycle'],
}

export default Repeat2Icon
