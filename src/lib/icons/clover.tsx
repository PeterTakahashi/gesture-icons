import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Clover — luck turns up. The stem breaks the leaf's four-fold symmetry, so
 * a true 90° turn would land on a different picture than it started on —
 * instead the whole clover sways side to side about the junction where its
 * lobes meet, with a small hopeful scale pop, and settles back exactly home.
 * Base geometry: Lucide `clover` (ISC).
 */
const DUR = 0.85

export function CloverIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clover'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -8, 8, 0],
            scale: [1, 1.06, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.66, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M16.17 7.83 2 22" />
        <path d="M4.02 12a2.827 2.827 0 1 1 3.81-4.17A2.827 2.827 0 1 1 12 4.02a2.827 2.827 0 1 1 4.17 3.81A2.827 2.827 0 1 1 19.98 12a2.827 2.827 0 1 1-3.81 4.17A2.827 2.827 0 1 1 12 19.98a2.827 2.827 0 1 1-4.17-3.81A1 1 0 1 1 4 12" />
        <path d="m7.83 7.83 8.34 8.34" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clover',
  gesture: 'luck turns up',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['luck', 'irish', 'four-leaf', 'clover'],
}

export default CloverIcon
