import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Gallery horizontal end — the stack fans. The front photo (at the end of
 * the reel) nudges 1.5 further out; the two back edges behind it counter-
 * nudge 0.8 the other way, as one layer — then both settle back exactly as
 * drawn. Plurality shown by the deck shuffling once.
 * Base geometry: Lucide `gallery-horizontal-end` (ISC).
 */
const DUR = 0.95

export function GalleryHorizontalEndIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gallery horizontal end'}
      {...hoverProps}
    >
      {/* front photo nudges further right, toward the end */}
      <motion.rect
        width="12" height="18" x="10" y="3" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: { x: [0, 1.5, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      {/* the reel behind it counter-nudges left, a smaller amount */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: { x: [0, -0.8, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      >
        <path d="M2 7v10" />
        <path d="M6 5v14" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gallery-horizontal-end',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'gallery', 'horizontal', 'end'],
}

export default GalleryHorizontalEndIcon
