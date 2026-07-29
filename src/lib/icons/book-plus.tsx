import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Book plus — one more is added. The plus dips to nothing and overshoots
 * back (the same stamp as user-plus.tsx), while the book body takes a
 * small dip on the pop frame — everything else holds.
 * Base geometry: Lucide `book-plus` (ISC).
 */
const DUR = 1.0

export function BookPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book plus'}
      {...hoverProps}
    >
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.65, 0.9], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 7v6" />
        <path d="M9 10h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['add', 'new', 'book', 'plus'],
}

export default BookPlusIcon
