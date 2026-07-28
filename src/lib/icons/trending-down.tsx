import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, gravity, pen } from '../core/easings'

/**
 * Trending down — it slides. Mirror of trending-up: the source line is
 * re-expressed starting at the top-left point so the pen travels left to
 * right, downhill. The arrowhead shrinks with the erase and lands under
 * gravity — a heavier drop than the climbing sibling's pop.
 * Base geometry: Lucide `trending-down` (ISC).
 */
const DUR = 1.05

export function TrendingDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'trending down'}
      {...hoverProps}
    >
      <motion.path
        d="M16 17h6v-6"
        style={{ transformBox: 'view-box', transformOrigin: '22px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 0.001, 1.15, 1],
            transition: {
              duration: DUR,
              times: [0, 0.2, 0.6, 0.8, 1],
              ease: [easeInCubic, 'linear', gravity, easeOutQuart],
            },
          },
        }}
      />
      <motion.path
        d="M2 7L8.5 13.5L13.5 8.5L22 17"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.28, 0.72], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'trending-down',
  gesture: 'it slides',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['loss', 'down', 'stocks'],
}

export default TrendingDownIcon
