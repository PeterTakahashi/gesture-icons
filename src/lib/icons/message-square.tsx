import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Message square — a message lands. A soft drop: a small hop up, then down
 * past rest and back, the tail corner leading the arrival — then still.
 * Base geometry: Lucide `message-square` (ISC).
 */
const DUR = 0.75

export function MessageSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'message square'}
      {...hoverProps}
    >
      <motion.path
        d="M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.68, 1], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'message-square',
  gesture: 'a message lands',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['chat', 'comment', 'dm'],
}

export default MessageSquareIcon
