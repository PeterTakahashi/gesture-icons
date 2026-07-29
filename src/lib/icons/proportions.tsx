import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Proportions — it makes its move. The inner selection bracket — the L-path
 * marking the right-hand box's own corner — NUDGEs outward along its own
 * diagonal, growing the proportion it frames: a small wind-up in, a drive
 * out past the mark, a settle back home. The outer frame and the shared
 * divider hold still; they are the static rails the box is measured against.
 * Base geometry: Lucide `proportions` (ISC).
 */
const DUR = 0.8

export function ProportionsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'proportions'}
      {...hoverProps}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="M12 9v11" />
      <motion.path
        d="M2 9h13a2 2 0 0 1 2 2v9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.4, 1.3, 0],
            y: [0, -0.4, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'proportions',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'proportions'],
}

export default ProportionsIcon
