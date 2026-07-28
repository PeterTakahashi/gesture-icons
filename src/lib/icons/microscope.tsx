import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Microscope — it focuses. The eyepiece tube racks down toward the stage,
 * settles a hair high, then takes one more micro-adjust down before
 * racking back up to rest — the fine hunt for focus. The base and arm hold
 * still throughout.
 * Base geometry: Lucide `microscope` (ISC).
 */
const DUR = 1.0

export function MicroscopeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'microscope'}
      {...hoverProps}
    >
      <path d="M6 18h8" />
      <path d="M3 22h18" />
      <path d="M14 22a7 7 0 1 0 0-14h-1" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.3, 1.0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.5, 0.75, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M9 14h2" />
        <path d="M9 12a2 2 0 0 1-2-2V6h6v4a2 2 0 0 1-2 2Z" />
        <path d="M12 6V3a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'microscope',
  gesture: 'it focuses',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['lab', 'science', 'research'],
}

export default MicroscopeIcon
