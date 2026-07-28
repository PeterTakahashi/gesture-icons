import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeOutQuart, easeInCubic } from '../core/easings'

/**
 * RSS — it broadcasts in rings. The dot pulses once — the signal firing —
 * while both arcs erase with it, then they redraw outward: small ring
 * first, big ring a beat behind, exactly like a feed catching up.
 * Base geometry: Lucide `rss` (ISC).
 */
const DUR = 1.0

export function RssIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rss'}
      {...hoverProps}
    >
      <motion.path
        d="M4 11a9 9 0 0 1 9 9"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.4, 0.72], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M4 4a16 16 0 0 1 16 16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.86], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.circle
        cx="5" cy="19" r="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.4, 1, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.36, 1], ease: [settleBack, easeOutQuart, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'rss',
  gesture: 'it broadcasts in rings',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['feed', 'news', 'subscribe'],
}

export default RssIcon
