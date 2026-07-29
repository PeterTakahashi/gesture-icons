import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Shield x — it is refused. Only the X shakes no — a decaying rotation
 * about its own center, same language as x-circle.tsx and user-x.tsx —
 * while the shield holds perfectly still.
 * Base geometry: Lucide `shield-x` (ISC).
 */
const DUR = 0.85

export function ShieldXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield x'}
      {...hoverProps}
    >
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
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
        <path d="m14.5 9.5-5 5" />
        <path d="m9.5 9.5 5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shield-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['cancel', 'remove', 'shield'],
}

export default ShieldXIcon
