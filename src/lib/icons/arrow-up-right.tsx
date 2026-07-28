import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow up-right — it points the way out. One rigid nudge along its own
 * diagonal: wind-up back toward the tail, drive out past the tip, settle
 * home. Both strokes move together — the bracket and the shaft are one
 * arrowhead, not a separable head/shaft pair.
 * Base geometry: Lucide `arrow-up-right` (ISC).
 */
const DUR = 0.8

export function ArrowUpRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow up right'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.1, 2.2, 0],
            y: [0, 1.1, -2.2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M7 7h10v10" />
        <path d="M7 17 17 7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'arrow-up-right',
  gesture: 'it points the way out',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['diagonal', 'external'],
}

export default ArrowUpRightIcon
