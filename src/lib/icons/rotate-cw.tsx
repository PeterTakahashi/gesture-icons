import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Rotate CW — it winds forward once. A small wind-up against the direction
 * of travel, then a full clockwise revolution about the glyph's own center.
 * 360° is the same picture as 0°, so the landing is free.
 * Base geometry: Lucide `rotate-cw` (ISC).
 */
const DUR = 1.1

export function RotateCwIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rotate cw'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 360],
            transition: { duration: DUR, times: [0, 0.18, 1], ease: [easeInOutCubic, [0.45, 0, 0.25, 1]] },
          },
        }}
      >
        <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'rotate-cw',
  gesture: 'it winds forward once',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['clockwise', 'refresh'],
}

export default RotateCwIcon
