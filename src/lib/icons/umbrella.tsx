import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Umbrella — it shakes off the rain. A brisk shake about the handle tip at
 * the bottom, decaying fast — snappier than a bell's ring, shedding water
 * rather than announcing something.
 * Base geometry: Lucide `umbrella` (ISC).
 */
const DUR = 0.8

export function UmbrellaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'umbrella'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 13v7a2 2 0 0 0 4 0" />
        <path d="M12 2v2" />
        <path d="M20.992 13a1 1 0 0 0 .97-1.274 10.284 10.284 0 0 0-19.923 0A1 1 0 0 0 3 13z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'umbrella',
  gesture: 'it shakes off the rain',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['rain', 'weather', 'protection'],
}

export default UmbrellaIcon
