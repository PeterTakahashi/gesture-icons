import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Flower 2 — it turns to the light. The head (the petal marks and the
 * center) rotates about the top of the stem — heliotropism in one gesture —
 * while the stem and leaves stand still beneath it.
 * Base geometry: Lucide `flower-2` (ISC).
 */
const DUR = 0.9

export function Flower2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flower 2'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 5a3 3 0 1 1 3 3m-3-3a3 3 0 1 0-3 3m3-3v1M9 8a3 3 0 1 0 3 3M9 8h1m5 0a3 3 0 1 1-3 3m3-3h-1m-2 3v-1" />
        <circle cx="12" cy="8" r="2" />
      </motion.g>
      <path d="M12 10v12" />
      <path d="M12 22c4.2 0 7-1.667 7-5-4.2 0-7 1.667-7 5Z" />
      <path d="M12 22c-4.2 0-7-1.667-7-5 4.2 0 7 1.667 7 5Z" />
    </svg>
  )
}

export const meta = {
  name: 'flower-2',
  gesture: 'it turns to the light',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['nature', 'bloom'],
}

export default Flower2Icon
