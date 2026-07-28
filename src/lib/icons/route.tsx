import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Route — the way is plotted. The line erases then pen-draws from the start
 * dot to the end dot; the start dot pops as the line leaves it, the end dot
 * pops as the line arrives — the itinerary being worked out, once.
 * Base geometry: Lucide `route` (ISC).
 */
const DUR = 1.2

export function RouteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'route'}
      {...hoverProps}
    >
      <motion.circle
        cx="6" cy="19" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.34, 0.42, 1], ease: [easeOutQuart, settleBack, easeOutQuart, 'linear'] },
          },
        }}
      />
      <motion.path
        d="M9 19h8.5a3.5 3.5 0 0 0 0-7h-11a3.5 3.5 0 0 1 0-7H15"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.32, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.circle
        cx="18" cy="5" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.86, 0.93, 1], ease: [easeOutQuart, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'route',
  gesture: 'the way is plotted',
  family: 'draw-on' as const,
  section: 'Transport',
  tags: ['path', 'navigation', 'journey'],
}

export default RouteIcon
