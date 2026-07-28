import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, gravity } from '../core/easings'

/**
 * Funnel — something actually passes through it. A drop falls in from
 * above the frame, slows as the neck squeezes it, slips through, and
 * falls out past the bottom edge. At rest the drop is parked above the
 * viewBox, so the resting picture is Lucide's untouched funnel — hidden
 * by geometry, not by opacity.
 * Base geometry: Lucide `filter` (ISC).
 */
const DUR = 1.1

export function FunnelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'funnel'}
      {...hoverProps}
    >
      <motion.path
        d="M22 3H2l8 9.46V19l4 3v-9.54z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            // the funnel feels the drop squeeze through
            x: [0, 0, 0.5, -0.4, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.52, 0.64, 0.76, 0.88], ease: easeInOutCubic },
          },
        }}
      />
      <motion.circle
        cx="12" r="1.3" fill={color === 'currentColor' ? 'currentColor' : color} stroke="none"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cy: -3, r: 1.3 },
          animate: {
            cy: [-3, 9, 13, 17, 29],
            r: [1.3, 1.3, 1.05, 1.05, 1.25],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.46, 0.62, 0.88],
              ease: [gravity, easeInOutCubic, 'linear', gravity],
            },
          },
        }}
      />
    </svg>
  )
}
