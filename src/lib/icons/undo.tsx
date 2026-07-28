import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Undo — it takes it back. Both arcs of the hook share one circle, centered
 * at (14.5, 14.5) in viewBox units (derived: that point sits exactly 5.5
 * from all four arc endpoints), so the whole hook and its arrowhead turn
 * about that real center — a small wind-up forward, then -40° backward past
 * the mark, settling home. The arrowhead runs 3% ahead of the hook the
 * whole beat.
 * Base geometry: Lucide `undo-2` (ISC).
 */
const DUR = 1.0

export function UndoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const pivot = { transformBox: 'view-box' as const, transformOrigin: '14.5px 14.5px' }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'undo'}
      {...hoverProps}
    >
      <motion.path
        d="M9 14 4 9l5-5"
        style={pivot}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 6, -40, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.57, 0.97], ease: [easeInOutCubic, easeInOutCubic, settleBack] },
          },
        }}
      />
      <motion.path
        d="M4 9h10.5a5.5 5.5 0 0 1 5.5 5.5a5.5 5.5 0 0 1-5.5 5.5H11"
        style={pivot}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 6, -40, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.6, 1], ease: [easeInOutCubic, easeInOutCubic, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'undo',
  gesture: 'it takes it back',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['back', 'revert', 'history'],
}

export default UndoIcon
