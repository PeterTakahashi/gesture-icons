import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, settleBack, easeOutQuart } from '../core/easings'

/**
 * Radar — it sweeps. The directional arm turns a full 360° about the dish
 * center — a free landing, since a full turn always lands identical to
 * rest — and the target mark pops the instant the arm's bearing crosses
 * it (the arm starts at 45°, the mark sits at 180°, so contact lands at
 * 37.5% of the sweep).
 * Base geometry: Lucide `radar` (ISC).
 */
const DUR = 1.2

export function RadarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'radar'}
      {...hoverProps}
    >
      <path d="M19.07 4.93A10 10 0 0 0 6.99 3.34" />
      <path d="M4 6h.01" />
      <path d="M2.29 9.62A10 10 0 1 0 21.31 8.35" />
      <path d="M16.24 7.76A6 6 0 1 0 8.23 16.67" />
      <motion.path
        d="M12 18h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.8, 1, 1],
            transition: { duration: DUR, times: [0, 0.34, 0.38, 0.44, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      />
      <path d="M17.99 11.66A6 6 0 0 1 15.77 16.67" />
      <circle cx="12" cy="12" r="2" />
      <motion.path
        d="m13.41 10.59 5.66-5.66"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 360],
            transition: { duration: DUR, times: [0, 0.12, 1], ease: [easeInOutCubic, easeInOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'radar',
  gesture: 'it sweeps',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['scan', 'detect', 'military', 'radar'],
}

export default RadarIcon
