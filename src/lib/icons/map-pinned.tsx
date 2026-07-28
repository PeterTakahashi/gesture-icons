import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Map pinned — the place is marked. VARIANT(map-pin): the pin does its usual
 * lift-drop-stick, and the map's ribbon base dips exactly on the pin's
 * landing frame — the ground actually taking the hit.
 * Base geometry: Lucide `map-pinned` (ISC).
 */
const DUR = 1.0

export function MapPinnedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map pinned'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -3.5, -3.5, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.5, 0.68, 0.85], ease: [easeOutQuart, 'linear', gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M18 8c0 3.613-3.869 7.429-5.393 8.795a1 1 0 0 1-1.214 0C9.87 15.429 6 11.613 6 8a6 6 0 0 1 12 0" />
        <motion.circle
          cx="12" cy="8" r="2"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 0.7, 1.3, 1],
              transition: { duration: DUR, times: [0, 0.66, 0.7, 0.78, 0.88], ease: [easeOutQuart, 'linear', settleBack, easeOutQuart] },
            },
          }}
        />
      </motion.g>
      <motion.path
        d="M8.714 14h-3.71a1 1 0 0 0-.948.683l-2.004 6A1 1 0 0 0 3 22h18a1 1 0 0 0 .948-1.316l-2-6a1 1 0 0 0-.949-.684h-3.712"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.66, 0.72, 0.85], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'map-pinned',
  gesture: 'the place is marked',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['location', 'destination'],
}

export default MapPinnedIcon
