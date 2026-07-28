import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Type — it sets a letter. The T itself — top bar and stem — presses down
 * like a key striking paper, then pops back to rest. The baseline mark below
 * is the paper, not the key, so it never moves.
 * Base geometry: Lucide `type` (ISC).
 */
const DUR = 0.65

export function TypeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'type'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 4v16" />
        <path d="M4 7V5a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v2" />
      </motion.g>
      <path d="M9 20h6" />
    </svg>
  )
}

export const meta = {
  name: 'type',
  gesture: 'it sets a letter',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['font', 'typography', 'text'],
}

export default TypeIcon
