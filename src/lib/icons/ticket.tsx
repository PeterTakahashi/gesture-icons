import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Ticket — it is torn. A half-tear: the whole ticket rocks about the
 * perforation center with a small x-drift, the checker's hand testing the
 * tear line without actually splitting the stub — it's whole again the
 * instant it settles. (An honest simplification: the perforation marks are
 * a single stroke each, not two independently torn stubs, so the gesture is
 * a rock about that line rather than a literal split.)
 * Base geometry: Lucide `ticket` (ISC).
 */
const DUR = 0.65

export function TicketIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ticket'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, 3, -2, 0],
            x: [0, 0.5, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2Z" />
        <path d="M13 5v2" />
        <path d="M13 17v2" />
        <path d="M13 11v2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ticket',
  gesture: 'it is torn',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['admission', 'event', 'cinema'],
}

export default TicketIcon
