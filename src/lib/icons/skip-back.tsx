import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Skip back — back to the start. Mirror of skip-forward: the triangle
 * dashes left into the bar; the bar takes the contact with a small nudge
 * exactly on arrival, and the triangle returns to rest — one clock, so
 * the hit lands clean.
 * Base geometry: Lucide `skip-back` (ISC).
 */
const DUR = 0.9

export function SkipBackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'skip back'}
      {...hoverProps}
    >
      <motion.path
        d="M17.971 4.285A2 2 0 0 1 21 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -3.5, -3.5, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.56, 1], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M3 20V4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, -1, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.58, 0.8], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'skip-back',
  gesture: 'back to the start',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['previous', 'media', 'rewind'],
}

export default SkipBackIcon
