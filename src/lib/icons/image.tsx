import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Image — the sun rises in the frame. The photo's little sun lifts up off
 * its resting spot and settles back down; the mountain and the frame around
 * it hold still, the way a picture itself never moves.
 * Base geometry: Lucide `image` (ISC).
 */
const DUR = 0.95

export function ImageIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'image'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
      <motion.circle
        cx="9" cy="9" r="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
      <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
  )
}

export const meta = {
  name: 'image',
  gesture: 'the sun rises in the frame',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['photo', 'picture', 'gallery'],
}

export default ImageIcon
