import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Repeat — one lap of the loop. The top chevron (arriving at the right end
 * of the top rail) leaves off the right edge, is repositioned off the left
 * edge while genuinely out of frame, and arrives sliding back into place —
 * a wrap, not a bounce. The bottom chevron does the same in the other
 * direction, on the same clock, so they read as chasing each other around
 * the track. The rails themselves never move — only the traveling marks.
 * Base geometry: Lucide `repeat` (ISC).
 */
const DUR = 1.1
const HOP = 20

export function RepeatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'repeat'}
      {...hoverProps}
    >
      {/* top chevron travels right off-frame, wraps to the left, slides back in */}
      <motion.path
        d="m17 2 4 4-4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, HOP, HOP, -HOP, -HOP, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      />
      <path d="M3 11v-1a4 4 0 0 1 4-4h14" />
      {/* bottom chevron travels left off-frame, wraps to the right, slides back in */}
      <motion.path
        d="m7 22-4-4 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -HOP, -HOP, HOP, HOP, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      />
      <path d="M21 13v1a4 4 0 0 1-4 4H3" />
    </svg>
  )
}

export const meta = {
  name: 'repeat',
  gesture: 'it loops once',
  family: 'travel' as const,
  section: 'Arrows',
  tags: ['loop', 'cycle'],
}

export default RepeatIcon
