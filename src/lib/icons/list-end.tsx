import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * List end — it does what it means. The three rows hold still; the end
 * bracket and its arrow (physically one connected mark) NUDGE down as a
 * unit — wind-up up, drive down past the mark, settleBack home — reading as
 * the jump-to-end it points at.
 * Base geometry: Lucide `list-end` (ISC).
 */
const DUR = 0.8

export function ListEndIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list end'}
      {...hoverProps}
    >
      <path d="M16 5H3" />
      <path d="M16 12H3" />
      <path d="M9 19H3" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 2.2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m16 16-3 3 3 3" />
        <path d="M21 5v12a2 2 0 0 1-2 2h-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'list-end',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['list', 'end'],
}

export default ListEndIcon
