import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Gallery vertical end — the stack fans. The front photo (at the end of the
 * reel) nudges 1.5 further down; the two back edges above it counter-nudge
 * 0.8 up, as one layer — then both settle back exactly as drawn.
 * Base geometry: Lucide `gallery-vertical-end` (ISC).
 */
const DUR = 0.95

export function GalleryVerticalEndIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gallery vertical end'}
      {...hoverProps}
    >
      {/* front photo nudges further down, toward the end */}
      <motion.rect
        width="18" height="12" x="3" y="10" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, 1.5, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      />
      {/* the reel above it counter-nudges up, a smaller amount */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: { y: [0, -0.8, 0], transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] } },
        }}
      >
        <path d="M7 2h10" />
        <path d="M5 6h14" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gallery-vertical-end',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['collection', 'stack', 'gallery', 'vertical', 'end'],
}

export default GalleryVerticalEndIcon
