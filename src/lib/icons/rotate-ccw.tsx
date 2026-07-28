import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Rotate CCW — it winds back once. A small wind-up the wrong way, then a
 * full counterclockwise revolution about the glyph's own center. -360° is
 * the same picture as 0°, so the landing is free.
 * Base geometry: Lucide `rotate-ccw` (ISC).
 */
const DUR = 1.1

export function RotateCcwIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rotate ccw'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 12, -360],
            transition: { duration: DUR, times: [0, 0.18, 1], ease: [easeInOutCubic, [0.45, 0, 0.25, 1]] },
          },
        }}
      >
        <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
        <path d="M3 3v5h5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'rotate-ccw',
  gesture: 'it winds back once',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['reset', 'counterclockwise'],
}

export default RotateCcwIcon
