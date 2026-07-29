import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Hand helping — it offers help. The hand and forearm wind up a hair away
 * from the small mark, then nudge toward it and hold at the offer before
 * withdrawing gently; the mark itself doesn't move — it's what's being
 * reached for.
 * Base geometry: Lucide `hand-helping` (ISC).
 */
const DUR = 1.1

export function HandHelpingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hand helping'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.3, -1.3, -1.3, 0],
            y: [0, -0.2, 1, 1, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.42, 0.72, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M11 12h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 14" />
        <path d="m7 18 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9" />
      </motion.g>
      <path d="m2 13 6 6" />
    </svg>
  )
}

export const meta = {
  name: 'hand-helping',
  gesture: 'it offers help',
  family: 'rigid' as const,
  section: 'Hands',
  tags: ['support', 'give', 'care', 'hand', 'helping'],
}

export default HandHelpingIcon
