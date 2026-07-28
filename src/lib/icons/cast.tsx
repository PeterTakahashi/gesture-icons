import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Cast — it beams over. The corner signal arcs EMIT — erase together
 * then redraw outward, smallest (closest to the receiver) first, the big
 * arc a beat behind — the cast connecting, never a fade. The frame and
 * dot stay put.
 * Base geometry: Lucide `cast` (ISC).
 */
const DUR = 1.0

export function CastIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cast'}
      {...hoverProps}
    >
      <path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" />
      <motion.path
        d="M2 16a5 5 0 0 1 4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.3, 0.6], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M2 12a9 9 0 0 1 8 8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.42, 0.75], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <line x1="2" x2="2.01" y1="20" y2="20" />
    </svg>
  )
}

export const meta = {
  name: 'cast',
  gesture: 'it beams over',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['stream', 'chromecast', 'tv'],
}

export default CastIcon
