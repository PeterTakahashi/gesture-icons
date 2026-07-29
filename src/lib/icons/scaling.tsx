import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Scaling — it makes its move. The top-right corner bracket — the one true
 * drag handle in this glyph, echoing maximize.tsx's corner treatment —
 * NUDGEs outward along its own diagonal: wind up in, drive out past the
 * mark, settle back home. The frame, the diagonal guide, and the small
 * proportion box are the interior marks; they hold still.
 * Base geometry: Lucide `scaling` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const DRIVE = 2
const WIND = 0.55

export function ScalingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scaling'}
      {...hoverProps}
    >
      <path d="M12 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M14 15H9v-5" />
      <motion.path
        d="M16 3h5v5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, 0],
            y: [0, WIND * D, -DRIVE * D, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
      <path d="M21 3 9 15" />
    </svg>
  )
}

export const meta = {
  name: 'scaling',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'scaling'],
}

export default ScalingIcon
