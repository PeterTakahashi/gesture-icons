import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Car front — it flashes its lights. The headlights blink once together
 * in a true binary step (a light doesn't dim, it's on or off), then the
 * body presses down on its suspension and springs back — greeting you.
 * Base geometry: Lucide `car-front` (ISC).
 */
const DUR = 0.9

export function CarFrontIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'car front'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.9, -0.1, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.55, 0.75, 0.95], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m21 8-2 2-1.5-3.7A2 2 0 0 0 15.646 5H8.4a2 2 0 0 0-1.903 1.257L5 10 3 8" />
        <rect width="18" height="8" x="3" y="10" rx="2" />
        <path d="M5 18v2" />
        <path d="M19 18v2" />
      </motion.g>
      <motion.path
        d="M7 14h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.08, 0.09, 0.2, 0.21, 0.3], ease: 'linear' },
          },
        }}
      />
      <motion.path
        d="M17 14h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.08, 0.09, 0.2, 0.21, 0.3], ease: 'linear' },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'car-front',
  gesture: 'it flashes its lights',
  family: 'secondary' as const,
  section: 'Transport',
  tags: ['vehicle', 'auto'],
}

export default CarFrontIcon
