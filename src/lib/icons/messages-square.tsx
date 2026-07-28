import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Messages square — the thread continues. The front bubble nudges up and
 * left (speaking up) while the back one dips the opposite way a half-beat
 * later — a back-and-forth exchange — then both settle home.
 * Base geometry: Lucide `messages-square` (ISC).
 */
const DUR = 1.0

export function MessagesSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'messages square'}
      {...hoverProps}
    >
      <motion.path
        d="M16 10a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 14.286V4a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1, -1, 0],
            y: [0, -1, -1, 0],
            transition: { duration: DUR, times: [0, 0.26, 0.56, 0.86], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M20 9a2 2 0 0 1 2 2v10.286a.71.71 0 0 1-1.212.502l-2.202-2.202A2 2 0 0 0 17.172 19H10a2 2 0 0 1-2-2v-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.5, 0.5, 0],
            y: [0, 0.5, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.46, 0.76, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'messages-square',
  gesture: 'the thread continues',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['chat', 'conversation', 'group'],
}

export default MessagesSquareIcon
