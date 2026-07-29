import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic, easeInCubic, pen } from '../core/easings'

/**
 * Book a — it opens and the letter writes itself. VARIANT(book): the cover
 * tips back on its spine exactly like book.tsx, holds, and swings shut with
 * a small landing dip. The "A" (its apex legs and crossbar) is a
 * letterform, so per the template's menu it performs a DRAW: it erases and
 * pen-redraws itself right as the cover reaches its held-open beat, the
 * crossbar trailing the legs by a hair the way a hand finishes a letter.
 * Base geometry: Lucide `book-a` (ISC).
 */
const DUR = 1.0

export function BookAIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book a'}
      {...hoverProps}
    >
      {/* spine at x=4 is the real hinge — the cover tips back about it */}
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
      <motion.path
        d="m8 13 4-7 4 7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.55, 0.65, 0.95], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M9.1 11h5.7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.62, 0.72, 1], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-a',
  gesture: 'it opens and the letter writes itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['book', 'read'],
}

export default BookAIcon
