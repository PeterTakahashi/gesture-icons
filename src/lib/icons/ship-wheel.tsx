import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Ship wheel — it steers to port. The whole wheel turns about its hub, held
 * a beat at the correction, then brought back through center — a real helm
 * correction, not a spin. The spokes repeat often enough that the held pose
 * still reads as a wheel, but the gesture ends back at true center.
 * Base geometry: Lucide `ship-wheel` (ISC).
 */
const DUR = 1.1

export function ShipWheelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ship wheel'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 4, -45, -45, 0],
            transition: { duration: DUR, times: [0, 0.1, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v7.5" />
        <path d="m19 5-5.23 5.23" />
        <path d="M22 12h-7.5" />
        <path d="m19 19-5.23-5.23" />
        <path d="M12 14.5V22" />
        <path d="M10.23 13.77 5 19" />
        <path d="M9.5 12H2" />
        <path d="M10.23 10.23 5 5" />
        <circle cx="12" cy="12" r="2.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ship-wheel',
  gesture: 'it steers to port',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['helm', 'navigate', 'sail', 'ship', 'wheel'],
}

export default ShipWheelIcon
