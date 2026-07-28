import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Map pin — it pins the spot. The pin lifts, hangs a beat, then falls with
 * gravity and sticks — a short landing overshoot below rest — and the
 * inner dot pops exactly on the frame it lands, the way a pushpin's head
 * gives when it's set.
 * Base geometry: Lucide `map-pin` (ISC).
 */
const DUR = 1.0

export function MapPinIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map pin'}
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
        <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0" />
        {/* the head pops exactly on the landing frame */}
        <motion.circle
          cx="12" cy="10" r="3"
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
    </svg>
  )
}

export const meta = {
  name: 'map-pin',
  gesture: 'it pins the spot',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['location', 'place', 'marker', 'gps'],
}

export default MapPinIcon
