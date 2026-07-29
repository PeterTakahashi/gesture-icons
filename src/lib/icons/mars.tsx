import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mars — the arrow asserts its direction. The arrowhead and its shaft (the
 * part of the glyph that actually points somewhere) wind up back toward the
 * circle, then drive out along their own up-right diagonal past the tip,
 * and settle home — the same NUDGE-along-its-own-axis language as
 * arrow-up-right, scaled up. The circle stays put; it isn't the part with a
 * direction.
 * Base geometry: Lucide `mars` (ISC).
 */
const DUR = 0.8

export function MarsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mars'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.9, 1.8, 0],
            y: [0, 0.9, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M16 3h5v5" />
        <path d="m21 3-6.75 6.75" />
      </motion.g>
      <circle cx="10" cy="14" r="6" />
    </svg>
  )
}

export const meta = {
  name: 'mars',
  gesture: 'the shield raises',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['gender', 'male', 'symbol', 'mars'],
}

export default MarsIcon
