import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart } from '../core/easings'

/**
 * Turntable — the record spins up. The platter is a plain disc, so a full
 * 360° turn is a free landing — slow-fast-slow, like a motor coming up to
 * speed. The tonearm pivots at its mount and dips onto the groove, holds
 * through the spin, and lifts back — a needle drop, not a wobble.
 * Base geometry: Lucide `turntable` (ISC).
 */
const DUR = 1.2

export function TurntableIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'turntable'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '10px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR, ease: easeInOutQuart },
          },
        }}
      >
        <path d="M10 12.01h.01" />
        <circle cx="10" cy="12" r="4" />
      </motion.g>
      <motion.path
        d="M18 8v4a8 8 0 0 1-1.07 4"
        style={{ transformBox: 'view-box', transformOrigin: '18px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 4, 4, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
      <rect x="2" y="4" width="20" height="16" rx="2" />
    </svg>
  )
}

export const meta = {
  name: 'turntable',
  gesture: 'the record spins up',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['dj', 'vinyl', 'music', 'turntable'],
}

export default TurntableIcon
