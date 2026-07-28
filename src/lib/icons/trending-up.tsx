import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Trending up — it climbs. Lucide's source line is parameterized from the
 * arrowhead end; it is re-expressed here as the same three points starting
 * at the bottom-left so the pen genuinely travels left to right. The
 * arrowhead itself shrinks away with the erase and pops back on arrival —
 * the climb happening as it lands.
 * Base geometry: Lucide `trending-up` (ISC).
 */
const DUR = 1.0

export function TrendingUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'trending up'}
      {...hoverProps}
    >
      <motion.path
        d="M16 7h6v6"
        style={{ transformBox: 'view-box', transformOrigin: '22px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 0.001, 1.3, 1],
            transition: {
              duration: DUR,
              times: [0, 0.2, 0.68, 0.85, 1],
              ease: [easeInCubic, 'linear', settleBack, easeOutQuart],
            },
          },
        }}
      />
      <motion.path
        d="M2 17L8.5 10.5L13.5 15.5L22 7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.28, 0.75], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'trending-up',
  gesture: 'it climbs',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['growth', 'up', 'stocks'],
}

export default TrendingUpIcon
