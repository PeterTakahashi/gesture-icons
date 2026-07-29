import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * Book check — it is confirmed. The check erases then pen-redraws (never a
 * fade), and the book body takes a small y dip exactly on the frame it
 * lands — the confirmation landing on the page.
 * Base geometry: Lucide `book-check` (ISC).
 */
const DUR = 1.0

export function BookCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book check'}
      {...hoverProps}
    >
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.8, 0.88], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m9 9.5 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.8], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['done', 'verified', 'book', 'check'],
}

export default BookCheckIcon
