import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Book marked — VARIANT(book): the place is kept. The ribbon winds up a
 * hair, then drives down and settles into the spine as it is tucked in,
 * while the book itself gives a small close-thump nod — much smaller than
 * `book`'s full cover-tip, since here it is only reacting to the ribbon
 * being set, not being opened and shut.
 * Base geometry: Lucide `book-marked` (ISC).
 */
const DUR = 0.9

export function BookMarkedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book marked'}
      {...hoverProps}
    >
      <motion.path
        d="M10 2v8l3-3 3 3V2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.5, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 1], ease: [easeInOutCubic, settleBack] },
          },
        }}
      />
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 0, -3, 1, 0],
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.78, 0.95], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-marked',
  gesture: 'the place is kept',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['read', 'bookmark'],
}

export default BookMarkedIcon
