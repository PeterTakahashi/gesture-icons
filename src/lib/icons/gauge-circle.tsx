import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Gauge circle — VARIANT(gauge): same mechanic as `gauge.tsx` — the needle
 * slams around and rings down decaying to rest — re-pivoted on this glyph's
 * own hub, which sits at (12, 12) where the needle line meets the dot. The
 * ring around it is still throughout; only the needle takes the reading.
 * Base geometry: Lucide `gauge-circle` (ISC).
 */
const DUR = 0.9

export function GaugeCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gauge circle'}
      {...hoverProps}
    >
      <path d="M15.6 2.7a10 10 0 1 0 5.7 5.7" />
      <circle cx="12" cy="12" r="2" />
      <motion.path
        d="M13.4 10.6 19 5"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -50, 20, -8, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.42, 0.65, 0.9], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'gauge-circle',
  gesture: 'the needle reads',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['meter', 'speed', 'gauge', 'circle'],
}

export default GaugeCircleIcon
