import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Glass water — the water settles. Only the surface line tilts, decaying
 * back to level about the glass's own center — the glass has just been set
 * down and the water is still finding still; the glass itself never moves.
 * Base geometry: Lucide `glass-water` (ISC).
 */
const DUR = 0.95

export function GlassWaterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'glass water'}
      {...hoverProps}
    >
      <path d="M5.116 4.104A1 1 0 0 1 6.11 3h11.78a1 1 0 0 1 .994 1.105L17.19 20.21A2 2 0 0 1 15.2 22H8.8a2 2 0 0 1-2-1.79z" />
      <motion.path
        d="M6 12a5 5 0 0 1 6 0 5 5 0 0 0 6 0"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 3, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.52, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'glass-water',
  gesture: 'the water settles',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['drink', 'hydrate', 'glass', 'water'],
}

export default GlassWaterIcon
