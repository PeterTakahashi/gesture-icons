import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Gallery horizontal — the stack fans. The centered photo nudges 1.5 along
 * the horizontal stack direction; the two flanking edges (the neighbors in
 * the reel) counter-nudge 0.8 the other way, as one back layer — then both
 * settle back to the exact picture Lucide drew. Plurality shown by the deck
 * shuffling once.
 * Base geometry: Lucide `gallery-horizontal` (ISC).
 */
const DUR = 0.95

export function GalleryHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gallery horizontal'}
      {...hoverProps}
    >
      {/* front photo nudges right, into the reel */}
      <motion.rect
        width="12" height="18" x="6" y="3" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: { x: [0, 1.5, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      {/* the neighboring edges counter-nudge left, a smaller amount */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: { x: [0, -0.8, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      >
        <path d="M2 3v18" />
        <path d="M22 3v18" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gallery-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'gallery', 'horizontal'],
}

export default GalleryHorizontalIcon
