import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Book minus — one is removed. The minus bar nudges away along its own
 * horizontal axis — a small wind-up, escorted out, and back — while the
 * book body holds completely still.
 * Base geometry: Lucide `book-minus` (ISC).
 */
const DUR = 0.8

export function BookMinusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book minus'}
      {...hoverProps}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <motion.path
        d="M9 10h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.3, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.9], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-minus',
  gesture: 'one is removed',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['remove', 'book', 'minus'],
}

export default BookMinusIcon
