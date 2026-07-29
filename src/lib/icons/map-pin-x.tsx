import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Map pin X — it is refused. A head-shake "no": the X rotates about its
 * own center, decaying with each swing (x.tsx's shake), while the pin
 * body holds still.
 * Base geometry: Lucide `map-pin-x` (ISC).
 */
const DUR = 0.85

export function MapPinXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map pin x'}
      {...hoverProps}
    >
      <path d="M19.752 11.901A7.78 7.78 0 0 0 20 10a8 8 0 0 0-16 0c0 4.993 5.539 10.193 7.399 11.799a1 1 0 0 0 1.202 0 19 19 0 0 0 .09-.077" />
      <circle cx="12" cy="10" r="3" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 18px' }}
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
        <path d="m21.5 15.5-5 5" />
        <path d="m21.5 20.5-5-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'map-pin-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['cancel', 'remove', 'map', 'pin'],
}

export default MapPinXIcon
