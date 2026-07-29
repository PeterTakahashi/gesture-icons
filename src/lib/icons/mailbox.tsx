import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Mailbox — the flag goes up. The little L-bracket flag hinges where it
 * meets the box, swings up to signal, holds a beat (you've got mail), then
 * lowers back down. The box, door and post never move.
 * Base geometry: Lucide `mailbox` (ISC).
 */
const DUR = 0.9

export function MailboxIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mailbox'}
      {...hoverProps}
    >
      <path d="M22 17a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9.5C2 7 4 5 6.5 5H18c2.2 0 4 1.8 4 4v8Z" />
      {/* flag mounts to the box at (15,9); the bracket swings up about that point */}
      <motion.polyline
        points="15,9 18,9 18,11"
        style={{ transformBox: 'view-box', transformOrigin: '15px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -35, -35, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.75, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
      <path d="M6.5 5C9 5 11 7 11 9.5V17a2 2 0 0 1-2 2" />
      <line x1="6" x2="7" y1="10" y2="10" />
    </svg>
  )
}

export const meta = {
  name: 'mailbox',
  gesture: "the flag goes up",
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['post', 'letter', 'home', 'mailbox'],
}

export default MailboxIcon
