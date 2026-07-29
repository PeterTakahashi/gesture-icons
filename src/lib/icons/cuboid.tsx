import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cuboid — it presents its face. A shallow tilt about the base shows the
 * box has depth, then squares back up. The hidden top-face edges are the
 * first thing a turning box reveals, so they lead the rotation by a hair —
 * the same ~3%-per-layer lag mechanics.md uses for impacts, run here as an
 * anticipation instead.
 * Base geometry: Lucide `cuboid` (ISC).
 */
const DUR = 0.9

export function CuboidIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cuboid'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.27, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10 22v-8" />
        <path d="M2.336 8.89 10 14l11.715-7.029" />
      </motion.g>
      <motion.path
        d="M22 14a2 2 0 0 1-.971 1.715l-10 6a2 2 0 0 1-2.138-.05l-6-4A2 2 0 0 1 2 16v-6a2 2 0 0 1 .971-1.715l10-6a2 2 0 0 1 2.138.05l6 4A2 2 0 0 1 22 8z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cuboid',
  gesture: 'it presents its face',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['3d', 'box', 'geometry', 'cuboid'],
}

export default CuboidIcon
