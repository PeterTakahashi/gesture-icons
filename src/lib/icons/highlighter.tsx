import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo, easeInOutCubic } from '../core/easings'

/**
 * Highlighter — it sweeps a highlight. The marker body pulls back, drives
 * forward in one broad pass with its body tilted into the stroke, and
 * settles level — a single sweep, not a scrub. The mark it already left on
 * the page stays put; only the tool moves.
 * Base geometry: Lucide `highlighter` (ISC).
 */
const DUR = 0.8

export function HighlighterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'highlighter'}
      {...hoverProps}
    >
      <path d="m9 11-6 6v3h9l3-3" />
      <motion.path
        d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"
        style={{ transformBox: 'view-box', transformOrigin: '18px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -2.5, 2, 0],
            rotate: [0, -4, -4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInCubic, easeOutExpo, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'highlighter',
  gesture: 'it sweeps a highlight',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['marker', 'emphasis'],
}

export default HighlighterIcon
