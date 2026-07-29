import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Book up 2 — it opens to read. The cover tips back on its spine and swings
 * shut with a landing dip (book.tsx's beat); the double up-chevrons wind
 * down a hair then drive upward, settling home right as the cover lands.
 * Base geometry: Lucide `book-up-2` (ISC).
 */
const DUR = 1.0

export function BookUp2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book up 2'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, -8, 0],
            y: [0, 0, 0, 1.3, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.32, 0.62, 0.88], ease: [easeOutQuart, 'linear', easeInOutCubic] },
              y: { times: [0, 0.85, 0.9, 0.96, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
            },
          },
        }}
      >
        <path d="M18 2h1a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
        <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -2.2, 0],
            transition: { duration: 0.75, delay: 0.15, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 13V7" />
        <path d="m9 10 3-3 3 3" />
        <path d="m9 5 3-3 3 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-up-2',
  gesture: 'it opens to read',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read'],
}

export default BookUp2Icon
