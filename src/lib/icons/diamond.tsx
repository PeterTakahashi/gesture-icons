import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Diamond — it balances on a point. The whole gem wobbles about its bottom
 * vertex (12, 21.3 — the midpoint of the rounded bottom corner in the path
 * itself), each rock smaller than the last, settling back dead level.
 * Base geometry: Lucide `diamond` (ISC).
 */
const DUR = 0.85

export function DiamondIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'diamond'}
      {...hoverProps}
    >
      <motion.path
        d="M2.7 10.3a2.41 2.41 0 0 0 0 3.41l7.59 7.59a2.41 2.41 0 0 0 3.41 0l7.59-7.59a2.41 2.41 0 0 0 0-3.41l-7.59-7.59a2.41 2.41 0 0 0-3.41 0Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21.3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 5, -2.5, 1, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.38, 0.58, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'diamond',
  gesture: 'it balances on a point',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'gem'],
}

export default DiamondIcon
