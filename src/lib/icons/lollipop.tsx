import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Lollipop — it twirls. The head (spiral + ring) spins a full 360° about
 * its own center — the spiral is not point-symmetric at 180°, so a half
 * turn would land on a different picture; a full turn is the free landing
 * that costs nothing. The stick stays put — it is what is doing the
 * twirling.
 * Base geometry: Lucide `lollipop` (ISC).
 */
const DUR = 0.9
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function LollipopIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lollipop'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 372, 360],
            transition: { duration: DUR, times: [0, 0.15, 0.75, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="M11 11a2 2 0 0 0 4 0 4 4 0 0 0-8 0 6 6 0 0 0 12 0" />
      </motion.g>
      <path d="m21 21-4.3-4.3" />
    </svg>
  )
}

export const meta = {
  name: 'lollipop',
  gesture: 'it twirls',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['sweet', 'treat'],
}

export default LollipopIcon
