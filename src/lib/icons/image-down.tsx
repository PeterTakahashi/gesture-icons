import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Image down — it urges downward. NUDGE: the download-arrow badge winds up
 * a hair, drives down, and settles back on its resting mark; the frame,
 * mountain, and sun hold still — a picture doesn't move when you save it.
 * Base geometry: Lucide `image-down` (ISC).
 */
const DUR = 0.9

export function ImageDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'image down'}
      {...hoverProps}
    >
      <path d="M10.3 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10l-3.1-3.1a2 2 0 0 0-2.814.014L6 21" />
      <circle cx="9" cy="9" r="2" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 2.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m14 19 3 3v-5.5" />
        <path d="m17 22 3-3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'image-down',
  gesture: 'it urges downward',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['down', 'image'],
}

export default ImageDownIcon
