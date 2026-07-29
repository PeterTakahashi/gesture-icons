import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Book dashed — VARIANT(book): the same cover-tip beat as book.tsx, hinged
 * at the spine (4px, 12px) with a soft closing dip on the contact frame.
 * The dashed mark performs its own verb right on that landing frame: every
 * dash segment erases and pen-redraws together, so the broken border
 * re-traces itself the instant the cover shuts.
 * Base geometry: Lucide `book-dashed` (ISC).
 */
const DUR = 1.0

const DASHES = [
  'M12 17h1.5',
  'M12 22h1.5',
  'M12 2h1.5',
  'M17.5 22H19a1 1 0 0 0 1-1',
  'M17.5 2H19a1 1 0 0 1 1 1v1.5',
  'M20 14v3h-2.5',
  'M20 8.5V10',
  'M4 10V8.5',
  'M4 19.5V14',
  'M4 4.5A2.5 2.5 0 0 1 6.5 2H8',
  'M8 22H6.5a1 1 0 0 1 0-5H8',
]

export function BookDashedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book dashed'}
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
        {DASHES.map((d) => (
          <motion.path
            key={d}
            d={d}
            initial="normal"
            animate={controls}
            variants={{
              normal: { pathLength: 1 },
              animate: {
                pathLength: [1, 1, 0.001, 1],
                transition: { duration: DUR, times: [0, 0.88, 0.94, 1], ease: ['linear', 'linear', pen] },
              },
            }}
          />
        ))}
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-dashed',
  gesture: 'it opens to read',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read', 'dashed'],
}

export default BookDashedIcon
