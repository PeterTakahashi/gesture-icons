import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Book search — VARIANT(search): the lens (circle + handle) sweeps a small
 * scan arc over the book and settles, exactly as file-search.tsx and
 * folder-search.tsx do; the book itself holds still.
 * Base geometry: Lucide `book-search` (ISC).
 */
const DUR = 0.95

export function BookSearchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book search'}
      {...hoverProps}
    >
      <path d="M11 22H5.5a1 1 0 0 1 0-5h4.501" />
      <path d="M3 19.5v-15A2.5 2.5 0 0 1 5.5 2H18a1 1 0 0 1 1 1v8" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -1.2, 1.2, 0],
            y: [0, -1.2, 1.2, 0],
            rotate: [0, -4, 4, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.66, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m21 22-1.879-1.878" />
        <circle cx="17" cy="18" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-search',
  gesture: 'it is inspected',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['find', 'book', 'search'],
}

export default BookSearchIcon
