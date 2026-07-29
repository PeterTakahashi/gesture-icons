import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, easeInCubic, pen } from '../core/easings'

/**
 * Book type — it opens to read. The cover tips back on its spine and swings
 * shut with a landing dip (book.tsx's beat); as it closes, the serif T
 * writes itself back on in the order a hand would draw it — cap, then
 * stem, then base.
 * Base geometry: Lucide `book-type` (ISC).
 */
const DUR = 1.0
const STROKES = ['M16 8V6H8v2', 'M12 6v7', 'M10 13h4']

export function BookTypeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book type'}
      {...hoverProps}
    >
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
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
      />
      {STROKES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 0.001, 0.001, 1],
              transition: {
                duration: 0.75,
                delay: i * 0.08,
                times: [0, 0.3, 0.46, 0.95],
                ease: [easeInCubic, 'linear', pen],
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'book-type',
  gesture: 'it opens to read',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read', 'type'],
}

export default BookTypeIcon
