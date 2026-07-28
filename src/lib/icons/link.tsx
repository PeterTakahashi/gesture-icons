import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Link — the links snap together. The two halves part along their own
 * diagonal axis, hold apart for a beat, then snap back — overshooting past
 * center before they settle. Since both halves share the same stroke and
 * color, the brief pass-through at the snap is invisible; it reads as a
 * plug clicking home.
 * Base geometry: Lucide `link` (ISC).
 */
const DUR = 1.0

export function LinkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'link'}
      {...hoverProps}
    >
      <motion.path
        d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 2, 2, -0.4, 0],
            y: [0, -2, -2, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.31, 0.55, 1], ease: [easeInCubic, 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -2, -2, 0.4, 0],
            y: [0, 2, 2, -0.4, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.31, 0.55, 1], ease: [easeInCubic, 'linear', settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'link',
  gesture: 'the links snap together',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['chain', 'url', 'connect'],
}

export default LinkIcon
