import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Book — it opens to read. The whole cover tips back on the spine it is
 * bound at, holds a beat as if a page were being read, then swings shut
 * with a soft closing thump (a small landing dip right on the contact
 * frame). The glyph is a single compound outline, so the "cover" and the
 * "thump" are both authored as the one shape rotating/dipping about its
 * spine rather than as separate layers.
 * Base geometry: Lucide `book` (ISC).
 */
const DUR = 1.0

export function BookIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book'}
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
    </svg>
  )
}

export const meta = {
  name: 'book',
  gesture: 'it opens to read',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['read', 'library'],
}

export default BookIcon
