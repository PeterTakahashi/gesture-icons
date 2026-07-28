import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * History — it looks back. The arrow-circle (arc plus its arrowhead flag)
 * turns about the arc's own center (12, 12) — a small forward tick, a turn
 * to -45° (the glance backward), then all the way home. The clock hands
 * drawn inside it hold still throughout: they mark a fixed time, they are
 * not the thing turning.
 * Base geometry: Lucide `history` (ISC).
 */
const DUR = 0.9

export function HistoryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'history'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 8, -45, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </motion.g>
      {/* the hands mark a fixed time — they never turn */}
      <path d="M12 7v5l4 2" />
    </svg>
  )
}

export const meta = {
  name: 'history',
  gesture: 'it looks back',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['undo', 'past', 'log'],
}

export default HistoryIcon
