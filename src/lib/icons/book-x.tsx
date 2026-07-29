import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Book x — it's declined. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (12px, 9.5px, the midpoint of its two
 * diagonals) — while the book's spine and cover hold perfectly still.
 * Base geometry: Lucide `book-x` (ISC).
 */
const DUR = 0.85

export function BookXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book x'}
      {...hoverProps}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 9.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14.5 7-5 5" />
        <path d="m9.5 7 5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-x',
  gesture: "it's declined",
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['cancel', 'remove', 'book'],
}

export default BookXIcon
