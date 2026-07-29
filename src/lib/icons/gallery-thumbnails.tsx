import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Gallery thumbnails — the stack fans. The main photo nudges 1.5 up, toward
 * the viewer, while the thumbnail strip below counter-nudges 0.8 down, as
 * one back layer — then both settle back exactly as drawn.
 * Base geometry: Lucide `gallery-thumbnails` (ISC).
 */
const DUR = 0.95

export function GalleryThumbnailsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gallery thumbnails'}
      {...hoverProps}
    >
      {/* main photo nudges up */}
      <motion.rect
        width="18" height="14" x="3" y="3" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, -1.5, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      {/* thumbnail strip counter-nudges down, a smaller amount */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, 0.8, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      >
        <path d="M4 21h1" />
        <path d="M9 21h1" />
        <path d="M14 21h1" />
        <path d="M19 21h1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gallery-thumbnails',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'gallery', 'thumbnails'],
}

export default GalleryThumbnailsIcon
