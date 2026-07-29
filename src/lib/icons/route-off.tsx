import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Route off — it is switched off. The slash erases then pen-redraws across
 * the broken route (never a fade) while the whole plotted way gives one
 * small defeated sag-and-tilt about its center and settles.
 * Base geometry: Lucide `route-off` (ISC).
 */
const DUR = 0.95

export function RouteOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'route off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2, 0],
            rotate: [0, 3, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="6" cy="19" r="3" />
        <path d="M9 19h8.5c.4 0 .9-.1 1.3-.2" />
        <path d="M5.2 5.2A3.5 3.53 0 0 0 6.5 12H12" />
        <path d="M21 15.3a3.5 3.5 0 0 0-3.3-3.3" />
        <path d="M15 5h-4.3" />
        <circle cx="18" cy="5" r="3" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'route-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Transport',
  tags: ['disabled', 'off', 'route'],
}

export default RouteOffIcon
