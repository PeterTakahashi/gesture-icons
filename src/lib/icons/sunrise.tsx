import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Sunrise — the sun comes up. The sun's arc and the rays around it lift
 * together off the horizon, the rays extending outward from the sun's own
 * center as they rise, hold at the top of the beat, and set back down. The
 * horizon line never moves.
 * Base geometry: Lucide `sunrise` (ISC).
 */
const DUR = 1.1

export function SunriseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sunrise'}
      {...hoverProps}
    >
      {/* rays extend outward from the sun's center as they rise */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scale: 1 },
          animate: {
            y: [0, -2, -2, 0],
            scale: [1, 1.15, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M12 2v8" />
        <path d="m4.93 10.93 1.41 1.41" />
        <path d="M2 18h2" />
        <path d="M20 18h2" />
        <path d="m19.07 10.93-1.41 1.41" />
        <path d="m8 6 4-4 4 4" />
      </motion.g>
      <path d="M22 22H2" />
      <motion.path
        d="M16 18a4 4 0 0 0-8 0"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'sunrise',
  gesture: 'the sun comes up',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['morning', 'dawn', 'day'],
}

export default SunriseIcon
