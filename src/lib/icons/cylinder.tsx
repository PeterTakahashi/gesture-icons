import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cylinder — it rolls a little. A shove sets it rocking about its base
 * center — rotation and a matching horizontal nudge on the same clock — and
 * it settles back upright exactly where it stood.
 * Base geometry: Lucide `cylinder` (ISC).
 */
const DUR = 0.85

export function CylinderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cylinder'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, 6, -3, 0],
            x: [0, 1, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.36, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <ellipse cx="12" cy="5" rx="9" ry="3" />
        <path d="M3 5v14a9 3 0 0 0 18 0V5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cylinder',
  gesture: 'it rolls a little',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['3d', 'geometry', 'cylinder'],
}

export default CylinderIcon
