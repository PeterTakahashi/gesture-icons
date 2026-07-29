import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Book image — it does what it means. The photo's little sun lifts up off
 * its resting spot and settles back down, per `image.tsx`; the book gives
 * a small cover-tip beat on the settle, right as the sun lands.
 * Base geometry: Lucide `book-image` (ISC).
 */
const DUR = 0.95

export function BookImageIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book image'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -4, 0],
            transition: { duration: DUR, times: [0, 0.7, 0.85, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="m20 13.7-2.1-2.1a2 2 0 0 0-2.8 0L9.7 17" />
      </motion.g>
      <motion.circle
        cx="10" cy="8" r="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-image',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read', 'image'],
}

export default BookImageIcon
