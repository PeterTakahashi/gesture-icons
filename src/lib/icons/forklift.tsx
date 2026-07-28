import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Forklift — it lifts the pallet. The fork and its carriage ride straight
 * up the mast on a smooth hydraulic ease, hold, then lower with the same
 * precision — no wind-up, no overshoot. Machines don't celebrate; the mast,
 * wheels, and base stay exactly where they are.
 * Base geometry: Lucide `forklift` (ISC).
 */
const DUR = 1.1

export function ForkliftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'forklift'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.5, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 12H5a2 2 0 0 0-2 2v5" />
        <path d="M6 12V7a2 2 0 0 1 2-2h2.172a2 2 0 0 1 1.414.586l3.828 3.828A2 2 0 0 1 16 10.828" />
      </motion.g>
      <path d="M15 19h7" />
      <path d="M16 19V2" />
      <path d="M7 19h4" />
      <circle cx="13" cy="19" r="2" />
      <circle cx="5" cy="19" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'forklift',
  gesture: 'it lifts the pallet',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['warehouse', 'logistics'],
}

export default ForkliftIcon
