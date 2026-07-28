import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Book open — the pages leaf through. Lucide draws both page-halves and the
 * top curve as ONE compound path, so the left and right pages cannot be
 * lifted independently without inventing geometry. The honest reading of
 * the same silhouette: it breathes with two soft scaleY pulses about the
 * spine's own centre — a page riffling — while the spine line itself never
 * moves.
 * Base geometry: Lucide `book-open` (ISC).
 */
const DUR = 0.95

export function BookOpenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book open'}
      {...hoverProps}
    >
      {/* spine — still */}
      <path d="M12 5v16" />
      <motion.path
        d="M20.001 19A2 2 0 0 0 22 17V5a2 2 0 0 0-1.999-2L16 3.002A5 5 0 0 0 12 5a5 5 0 0 0-4-2H4a2 2 0 0 0-2 2v12a2 2 0 0 0 1.999 2H8a5 5 0 0 1 4 2 5 5 0 0 1 4-2z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.035, 1, 1.035, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.44, 0.66, 0.88], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'book-open',
  gesture: 'the pages turn',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['read', 'study'],
}

export default BookOpenIcon
