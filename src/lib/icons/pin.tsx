import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Pin — it pins the note. VARIANT(map-pin): lifted, then dropped with
 * gravity — but unlike the map pin, it does not bounce. A pushpin meets a
 * cork board and stops dead, the head pressing in a hair on contact. That
 * hard, no-overshoot landing is what separates a corkboard pin from a
 * map marker.
 * Base geometry: Lucide `pin` (ISC).
 */
const DUR = 0.9

export function PinIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pin'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scaleY: 1 },
          animate: {
            y: [0, -3, -3, 0, 0],
            scaleY: [1, 1, 1, 0.94, 1],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.5, 0.66, 0.85], ease: [easeOutQuart, 'linear', gravity, easeOutQuart] },
              scaleY: { times: [0, 0.5, 0.62, 0.7, 0.85], ease: ['linear', 'linear', easeOutQuart, easeOutQuart] },
            },
          },
        }}
      >
        <path d="M12 17v5" />
        <path d="M9 10.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24V16a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V7a1 1 0 0 1 1-1 2 2 0 0 0 0-4H8a2 2 0 0 0 0 4 1 1 0 0 1 1 1z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pin',
  gesture: 'it pins the note',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['pushpin', 'save', 'stick', 'pin'],
}

export default PinIcon
