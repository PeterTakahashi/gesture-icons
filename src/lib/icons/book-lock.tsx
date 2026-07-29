import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Book lock — it locks shut. The mini shackle lifts clear of its body,
 * holds a beat open, then drops with gravity; the lock body takes the hit
 * exactly on the contact frame and settles flat. The book itself never
 * moves — only the lock does the locking.
 * Base geometry: Lucide `book-lock` (ISC).
 */
const DUR = 1.0

export function BookLockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book lock'}
      {...hoverProps}
    >
      <path d="M20 15v6a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H10" />
      <motion.path
        d="M18 6V4a2 2 0 1 0-4 0v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        x="12" y="6" width="8" height="5" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 0.85, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-lock',
  gesture: 'it locks shut',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['secure', 'private', 'book', 'lock'],
}

export default BookLockIcon
