import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Bus — it kneels at the stop. The body dips and tilts down toward the
 * door side on its suspension, holds for boarding, then rises level again.
 * The wheels and the axle line between them stay planted — a bus kneels
 * on its air springs, it doesn't move on its wheels.
 * Base geometry: Lucide `bus` (ISC).
 */
const DUR = 1.1

export function BusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bus'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 1.2, 1.2, 0],
            rotate: [0, 1.5, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M8 6v6" />
        <path d="M15 6v6" />
        <path d="M2 12h19.6" />
        <path d="M18 18h3s.5-1.7.8-2.8c.1-.4.2-.8.2-1.2 0-.4-.1-.8-.2-1.2l-1.4-5C20.1 6.8 19.1 6 18 6H4a2 2 0 0 0-2 2v10h3" />
      </motion.g>
      <circle cx="7" cy="18" r="2" />
      <path d="M9 18h5" />
      <circle cx="16" cy="18" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'bus',
  gesture: 'it kneels at the stop',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['transit', 'public'],
}

export default BusIcon
