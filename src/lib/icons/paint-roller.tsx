import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Paint roller — it lays a coat. The whole roller slides sideways along its
 * own rolling direction and back, one continuous ease-in-out pass — the
 * handle follows rigidly, nothing bends.
 * Base geometry: Lucide `paint-roller` (ISC).
 */
const DUR = 0.9

export function PaintRollerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'paint roller'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2.2, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: easeInOutCubic },
          },
        }}
      >
        <rect width="16" height="6" x="2" y="2" rx="2" />
        <path d="M10 16v-2a2 2 0 0 1 2-2h8a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2h-2" />
        <rect width="4" height="6" x="8" y="16" rx="1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'paint-roller',
  gesture: 'it lays a coat',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['paint', 'decorate'],
}

export default PaintRollerIcon
