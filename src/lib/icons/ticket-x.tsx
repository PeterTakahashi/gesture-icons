import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Ticket x — it is refused. Only the X shakes no — a decaying rotation
 * about its own center, same language as x-circle.tsx and shield-x.tsx —
 * while the ticket body holds perfectly still.
 * Base geometry: Lucide `ticket-x` (ISC).
 */
const DUR = 0.85

export function TicketXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ticket x'}
      {...hoverProps}
    >
      <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
        <path d="m9.5 14.5 5-5" />
        <path d="m9.5 9.5 5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ticket-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['cancel', 'remove', 'ticket'],
}

export default TicketXIcon
