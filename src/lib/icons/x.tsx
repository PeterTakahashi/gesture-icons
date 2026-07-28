import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * X — it refuses. A head-shake "no": the whole cross rotates about its own
 * center, decaying with each swing, and settles back on the exact glyph
 * Lucide drew.
 * Base geometry: Lucide `x` (ISC).
 */
const DUR = 0.85

export function XIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'x'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 6 6 18" />
        <path d="m6 6 12 12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'x',
  gesture: 'it refuses',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['close', 'cancel', 'no', 'dismiss'],
}

export default XIcon
