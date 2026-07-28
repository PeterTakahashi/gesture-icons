import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Skull — it grins anyway. The little tooth mark clacks down and snaps
 * back up, twice, fast — a chatter. The cranium (which is one fused path
 * with the jawline in this glyph, so the two cannot move independently)
 * stays completely still, and so do the eyes.
 * Base geometry: Lucide `skull` (ISC).
 */
const DUR = 0.65

export function SkullIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'skull'}
      {...hoverProps}
    >
      <motion.path
        d="m12.5 17-.5-1-.5 1h1z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0, 0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.2, 0.42, 0.62, 0.85],
              ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      />
      <path d="M15 22a1 1 0 0 0 1-1v-1a2 2 0 0 0 1.56-3.25 8 8 0 1 0-11.12 0A2 2 0 0 0 8 20v1a1 1 0 0 0 1 1z" />
      <circle cx="15" cy="12" r="1" />
      <circle cx="9" cy="12" r="1" />
    </svg>
  )
}

export const meta = {
  name: 'skull',
  gesture: 'it grins anyway',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['death', 'danger', 'pirate'],
}

export default SkullIcon
