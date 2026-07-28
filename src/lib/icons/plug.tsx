import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Plug — it reaches the socket. The two prongs travel up their own axis
 * with a small wind-up, land with a hard ease-out stop — plugged — and
 * settle back down. The body and cable below never move.
 * Base geometry: Lucide `plug` (ISC).
 */
const DUR = 0.85

export function PlugIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'plug'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.4, -2.2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M15 8V2" />
        <path d="M9 8V2" />
      </motion.g>
      <path d="M12 22v-5" />
      <path d="M17 8a1 1 0 0 1 1 1v4a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1z" />
    </svg>
  )
}

export const meta = {
  name: 'plug',
  gesture: 'it reaches the socket',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['power', 'connect'],
}

export default PlugIcon
