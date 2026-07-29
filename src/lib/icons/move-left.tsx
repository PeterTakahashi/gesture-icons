import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Move left — it makes its move. A wind-up to the right (the load), then
 * the whole glyph drives left past the mark and settles home — the arrow
 * head and the full-width shaft travel together on one clock, center
 * unmoved at rest.
 * Base geometry: Lucide `move-left` (ISC).
 */
const DUR = 0.75

export function MoveLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'move left'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, -3.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M6 8L2 12L6 16" />
        <path d="M2 12H22" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'move-left',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['move', 'drag', 'left'],
}

export default MoveLeftIcon
