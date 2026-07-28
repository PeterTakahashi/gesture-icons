import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Traffic cone — it stands its post. A car passes and the cone leans on
 * its base, decaying back upright — wobbled, not toppled.
 * Base geometry: Lucide `traffic-cone` (ISC).
 */
const DUR = 0.9

export function TrafficConeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'traffic cone'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -5, 3, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.45, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M16.05 10.966a5 2.5 0 0 1-8.1 0" />
        <path d="m16.923 14.049 4.48 2.04a1 1 0 0 1 .001 1.831l-8.574 3.9a2 2 0 0 1-1.66 0l-8.574-3.91a1 1 0 0 1 0-1.83l4.484-2.04" />
        <path d="M16.949 14.14a5 2.5 0 1 1-9.9 0L10.063 3.5a2 2 0 0 1 3.874 0z" />
        <path d="M9.194 6.57a5 2.5 0 0 0 5.61 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'traffic-cone',
  gesture: 'it stands its post',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['construction', 'warning', 'road'],
}

export default TrafficConeIcon
