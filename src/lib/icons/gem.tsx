import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, pen, settleBack } from '../core/easings'

/**
 * Gem — it glints. Compact `star.tsx` energy: the gem gathers itself and
 * blooms back to rest, and at the peak of the bloom the top facet redraws
 * in a quick flash — the glint — via pathLength, never opacity.
 * Base geometry: Lucide `gem` (ISC).
 */
const DUR = 0.9

export function GemIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gem'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.92, 1.08, 1],
            rotate: [0, -4, 3, 0],
            transition: {
              duration: DUR,
              times: [0, 0.32, 0.62, 0.85],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, settleBack],
            },
          },
        }}
      >
        <path d="M17 3a2 2 0 0 1 1.6.8l3 4a2 2 0 0 1 .013 2.382l-7.99 10.986a2 2 0 0 1-3.247 0l-7.99-10.986A2 2 0 0 1 2.4 7.8l2.998-3.997A2 2 0 0 1 7 3z" />
        <path d="M2 9h20" />
        {/* the glint: the top facet redraws at the bloom's peak */}
        <motion.path
          d="M10.5 3 8 9l4 13 4-13-2.5-6"
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 1, 0.001, 0.001, 1],
              transition: { duration: DUR, times: [0, 0.6, 0.66, 0.7, 0.82], ease: ['linear', 'linear', 'linear', pen] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gem',
  gesture: 'it glints',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['diamond', 'jewel', 'premium', 'value'],
}

export default GemIcon
