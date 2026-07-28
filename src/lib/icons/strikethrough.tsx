import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo } from '../core/easings'

/**
 * Strikethrough — it strikes it out. The line erases in a quick wind-up,
 * then draws back across left-to-right fast and decisive (ease-out-expo,
 * not the gentler pen of underline) — one stroke, no scrub. The letterforms
 * it crosses out never move.
 * Base geometry: Lucide `strikethrough` (ISC).
 */
const DUR = 0.75

export function StrikethroughIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'strikethrough'}
      {...hoverProps}
    >
      <path d="M16 4H9a3 3 0 0 0-2.83 4" />
      <path d="M14 12a4 4 0 0 1 0 8H6" />
      <motion.line
        x1="4" x2="20" y1="12" y2="12"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.32, 0.62], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'strikethrough',
  gesture: 'it strikes it out',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['delete', 'format'],
}

export default StrikethroughIcon
