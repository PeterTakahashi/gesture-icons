import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Leaf — it turns in the wind. The blade and its vein swing together about
 * the stem tip at the bottom-left, decaying, with a tiny bob riding along
 * for the gust's lift — one gust, then still.
 * Base geometry: Lucide `leaf` (ISC).
 */
const DUR = 1.0

export function LeafIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'leaf'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '2px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            y: [0, -0.5, 0.3, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
        <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'leaf',
  gesture: 'it turns in the wind',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['nature', 'eco', 'green', 'leaf'],
}

export default LeafIcon
