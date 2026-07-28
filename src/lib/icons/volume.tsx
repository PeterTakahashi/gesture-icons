import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Volume — the sound comes out. Both wave arcs erase back toward the
 * speaker, then re-emit outward — inner arc first, outer arc a beat
 * behind, exactly how sound radiates in rings — and the speaker body
 * flinches back a hair as it fires. Erase and redraw are both stroke
 * length, never a fade.
 * Base geometry: Lucide `volume-2` (ISC).
 */
const DUR = 1.0

export function VolumeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'volume'}
      {...hoverProps}
    >
      <motion.path
        d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.4], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M16 9a5 5 0 0 1 0 6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.3, 0.65], ease: ['linear', 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M19.364 18.364a9 9 0 0 0 0-12.728"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.39, 0.86], ease: ['linear', 'linear', easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'volume',
  gesture: 'the sound comes out',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['audio', 'sound', 'speaker', 'loud'],
}

export default VolumeIcon
