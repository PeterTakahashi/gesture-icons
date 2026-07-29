import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Dices — the pair fans once. The front die (lower-left, square-cornered)
 * noses further down-left, the back die (upper-right, rotated) counter-noses
 * up-right — each carrying its own pips along for the ride — then both
 * settle back into the exact resting overlap.
 * Base geometry: Lucide `dices` (ISC).
 */
const DUR = 0.9

export function DicesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dices'}
      {...hoverProps}
    >
      {/* front die, the deeper end of the stack */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.5, 0],
            y: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <rect width="12" height="12" x="2" y="10" rx="2" ry="2" />
        <path d="M6 18h.01" />
        <path d="M10 14h.01" />
      </motion.g>
      {/* back die, counter-nudges the other way */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.8, 0],
            y: [0, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="m17.92 14 3.5-3.5a2.24 2.24 0 0 0 0-3l-5-4.92a2.24 2.24 0 0 0-3 0L10 6" />
        <path d="M15 6h.01" />
        <path d="M18 9h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'dices',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['collection', 'stack', 'dices'],
}

export default DicesIcon
