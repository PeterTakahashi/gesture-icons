import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Squircle — it smooths the corner. A contented breath: a soft scale swell
 * with a hair of rotate riding along — the friendliest rectangle there is,
 * settling back exactly where it started.
 * Base geometry: Lucide `squircle` (ISC).
 */
const DUR = 1.0

export function SquircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squircle'}
      {...hoverProps}
    >
      <motion.path
        d="M12 3c7.2 0 9 1.8 9 9s-1.8 9-9 9-9-1.8-9-9 1.8-9 9-9"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 1.05, 1],
            rotate: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'squircle',
  gesture: 'it smooths the corner',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'ios'],
}

export default SquircleIcon
