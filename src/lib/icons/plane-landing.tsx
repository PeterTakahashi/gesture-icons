import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Plane landing — it touches down. A small wind-up back and up (the
 * approach), a glide down along the slope, an ease-out flare into contact,
 * a gear-settle dip, then back to rest — one landing. The runway line
 * never moves; it's the ground, not the aircraft.
 * Base geometry: Lucide `plane-landing` (ISC).
 */
const DUR = 1.2

export function PlaneLandingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'plane landing'}
      {...hoverProps}
    >
      <path d="M2 22h20" />
      <motion.path
        d="M3.77 10.77 2 9l2-4.5 1.1.55c.55.28.9.84.9 1.45s.35 1.17.9 1.45L8 8.5l3-6 1.05.53a2 2 0 0 1 1.09 1.52l.72 5.4a2 2 0 0 0 1.09 1.52l4.4 2.2c.42.22.78.55 1.01.96l.6 1.03c.49.88-.06 1.98-1.06 2.1l-1.18.15c-.47.06-.95-.02-1.37-.24L4.29 11.15a2 2 0 0 1-.52-.38Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1, 3, 3, 1.2, 0],
            y: [0, -1, 2, 2.5, 0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.15, 0.5, 0.62, 0.78, 1],
              ease: [easeInCubic, easeInOutQuart, easeOutQuart, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'plane-landing',
  gesture: 'it touches down',
  family: 'travel' as const,
  section: 'Transport',
  tags: ['arrival', 'flight', 'airport'],
}

export default PlaneLandingIcon
