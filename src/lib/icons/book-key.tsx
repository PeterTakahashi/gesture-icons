import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Book key — it does what it means. VARIANT(book): the cover takes one small
 * tip beat about the spine (4px, 12px) — the same hinge book.tsx uses, just
 * a single nod instead of a full open-and-shut. The key performs its own
 * verb on the settle: it turns about its own bow (17px, 10px), the same
 * gesture as key.tsx, landing back on the exact glyph.
 * Base geometry: Lucide `book-key` (ISC).
 */
const DUR = 1.0

export function BookKeyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book key'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M13 2H6.5A2.5 2.5 0 0 0 4 4.5v15" />
        <path d="M20 15.2V21a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 60, 60, -3, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M17 2v6" />
        <path d="M17 4h2" />
        <circle cx="17" cy="10" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-key',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read', 'key'],
}

export default BookKeyIcon
