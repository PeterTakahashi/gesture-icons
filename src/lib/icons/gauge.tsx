import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Gauge — the needle jumps. The dial's arc spans from (3.34, 19) to
 * (20.66, 19) on a radius of 10, which centers the needle's own hub exactly
 * at (12, 14) — so the needle slams around that real point, decaying, an
 * instrument taking a reading. The dial never moves.
 * Base geometry: Lucide `gauge` (ISC).
 */
const DUR = 0.9

export function GaugeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gauge'}
      {...hoverProps}
    >
      <motion.path
        d="m12 14 4-4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
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
      <path d="M3.34 19a10 10 0 1 1 17.32 0" />
    </svg>
  )
}

export const meta = {
  name: 'gauge',
  gesture: 'the needle jumps',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['meter', 'speed', 'dashboard'],
}

export default GaugeIcon
