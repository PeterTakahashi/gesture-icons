import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Gallery vertical — the stack fans. The centered photo nudges 1.5 down,
 * along the vertical stack direction; the top and bottom edges (its
 * neighbors in the reel) counter-nudge 0.8 up, as one back layer — then
 * both settle back exactly as drawn.
 * Base geometry: Lucide `gallery-vertical` (ISC).
 */
const DUR = 0.95

export function GalleryVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gallery vertical'}
      {...hoverProps}
    >
      {/* front photo nudges down, into the reel */}
      <motion.rect
        width="18" height="12" x="3" y="6" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, 1.5, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      {/* the neighboring edges counter-nudge up, a smaller amount */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, -0.8, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      >
        <path d="M3 2h18" />
        <path d="M3 22h18" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gallery-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'gallery', 'vertical'],
}

export default GalleryVerticalIcon
