import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Sprout — it pushes up. The stem rises off the soil line, and each leaf
 * unfolds a few degrees outward as it goes — a day's growth in one beat.
 * The stem and its leaf are drawn as a single continuous stroke in Lucide's
 * source, so they rotate together as one unit rather than independently;
 * the free-standing left leaf gets its own opposite rotation. The ground
 * line never moves.
 * Base geometry: Lucide `sprout` (ISC).
 */
const DUR = 1.0

export function SproutIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sprout'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.08, 1],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
          },
        }}
      >
        <motion.path
          d="M14 9.536V7a4 4 0 0 1 4-4h1.5a.5.5 0 0 1 .5.5V5a4 4 0 0 1-4 4 4 4 0 0 0-4 4c0 2 1 3 1 5a5 5 0 0 1-1 3"
          style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 4, 0],
              transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
            },
          }}
        />
        <motion.path
          d="M4 9a5 5 0 0 1 8 4 5 5 0 0 1-8-4"
          style={{ transformBox: 'view-box', transformOrigin: '8px 11.5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -4, 0],
              transition: { duration: DUR, times: [0, 0.45, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
      <path d="M5 21h14" />
    </svg>
  )
}

export const meta = {
  name: 'sprout',
  gesture: 'it pushes up',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['grow', 'seedling', 'new'],
}

export default SproutIcon
