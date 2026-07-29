import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Book heart — it is loved. The small heart does a compact lub-dub — two
 * contractions, the second stronger, then diastole back to rest, per
 * `heart.tsx` — about its own center. The book holds still.
 * Base geometry: Lucide `book-heart` (ISC).
 */
export function BookHeartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book heart'}
      {...hoverProps}
    >
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      <motion.path
        d="M8.62 9.8A2.25 2.25 0 1 1 12 6.836a2.25 2.25 0 1 1 3.38 2.966l-2.626 2.856a.998.998 0 0 1-1.507 0z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            // lub … DUB …… settle
            scale: [1, 1.12, 1.02, 1.22, 0.99, 1],
            transition: {
              duration: 0.95,
              times: [0, 0.12, 0.26, 0.42, 0.62, 1],
              ease: [easeOutQuint, easeInOutCubic, easeOutQuint, easeInOutCubic, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-heart',
  gesture: 'it is loved',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['favorite', 'love', 'book', 'heart'],
}

export default BookHeartIcon
