import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tree deciduous — the canopy breathes. A single slow swell about the top
 * of the trunk, one breath of wind through summer leaves. The trunk holds.
 * Base geometry: Lucide `tree-deciduous` (ISC).
 */
const DUR = 1.3

export function TreeDeciduousIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tree deciduous'}
      {...hoverProps}
    >
      <motion.path
        d="M8 19a4 4 0 0 1-2.24-7.32A3.5 3.5 0 0 1 9 6.03V6a3 3 0 1 1 6 0v.04a3.5 3.5 0 0 1 3.24 5.65A4 4 0 0 1 16 19Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.05, 0.98, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M12 19v3" />
    </svg>
  )
}

export const meta = {
  name: 'tree-deciduous',
  gesture: 'the canopy breathes',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['forest', 'summer'],
}

export default TreeDeciduousIcon
