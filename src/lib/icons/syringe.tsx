import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Syringe — it administers. The plunger top eases down along the needle's
 * own axis, holds a beat while the dose is given, then withdraws back out
 * — done gently, not jabbed.
 * Base geometry: Lucide `syringe` (ISC).
 */
const DUR = 1.1

export function SyringeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'syringe'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.4, -1.4, 0],
            y: [0, 1.4, 1.4, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="m18 2 4 4" />
        <path d="m17 7 3-3" />
      </motion.g>
      <path d="M19 9 8.7 19.3c-1 1-2.5 1-3.4 0l-.6-.6c-1-1-1-2.5 0-3.4L15 5" />
      <path d="m9 11 4 4" />
      <path d="m5 19-3 3" />
      <path d="m14 4 6 6" />
    </svg>
  )
}

export const meta = {
  name: 'syringe',
  gesture: 'it administers',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['injection', 'vaccine', 'medical'],
}

export default SyringeIcon
