import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Move 3D — it makes its move. The axis frame (the two rulers and their
 * arrowheads) is the fixed reference grid, so it holds still; the diagonal
 * itself — the line that stands for the object's move — nudges further out
 * along its own direction and back: wind-up toward the origin, drive out
 * past the tip, settleBack home.
 * Base geometry: Lucide `move-3d` (ISC).
 */
const DUR = 0.8

export function Move3dIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'move 3d'}
      {...hoverProps}
    >
      <path d="M5 3v16h16" />
      <path d="m2 6 3-3 3 3" />
      <path d="m18 16 3 3-3 3" />
      <motion.path
        d="m5 19 6-6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.6, 1.2, 0],
            y: [0, 0.6, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'move-3d',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['move', 'drag'],
}

export default Move3dIcon
