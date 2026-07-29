import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, pen } from '../core/easings'

/**
 * Slash square — the frame holds still while the diagonal mark draws
 * itself: the slash pen-redraws corner to corner, and the square takes one
 * breath (a small scale pulse) as if it just registered the mark landing.
 * Base geometry: Lucide `slash-square` (ISC).
 */
const DUR = 0.9

export function SlashSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'slash square'}
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
            scale: [1, 1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.55, 0.75, 1], ease: easeOutQuart },
          },
        }}
      />
      <motion.line
        x1="9" x2="15" y1="15" y2="9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.08, 0.45, 0.85], ease: ['linear', 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'slash-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['frame', 'mark', 'slash', 'square'],
}

export default SlashSquareIcon
