import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Worm — it wiggles through. The whole body rotates and shears about its
 * own center in one S-curve beat — peristalsis read through a rigid
 * transform, since nothing here actually bends.
 * Base geometry: Lucide `worm` (ISC).
 */
const DUR = 1.0

export function WormIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'worm'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, -4, 4, -2, 0],
            x: [0, 1, 0, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m19 12-1.5 3" />
        <path d="M19.63 18.81 22 20" />
        <path d="M6.47 8.23a1.68 1.68 0 0 1 2.44 1.93l-.64 2.08a6.76 6.76 0 0 0 10.16 7.67l.42-.27a1 1 0 1 0-2.73-4.21l-.42.27a1.76 1.76 0 0 1-2.63-1.99l.64-2.08A6.66 6.66 0 0 0 3.94 3.9l-.7.4a1 1 0 1 0 2.55 4.34z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'worm',
  gesture: 'it wiggles through',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['animal', 'soil'],
}

export default WormIcon
