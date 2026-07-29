import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Gavel — order in the court. The head winds up about the grip end, then
 * cracks down past level to strike, an ease-in with no bounce so the stop
 * reads hard; the whole glyph takes a one-frame jolt down on contact.
 * Lucide's `gavel` draws only the head and handle — no separate sound
 * block — so the strike lands through that jolt alone.
 * Base geometry: Lucide `gavel` (ISC).
 */
const DUR = 0.85

export function GavelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gavel'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -22, 6, 0],
            y: [0, 0, 0.6, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.4, 0.62, 1], ease: [easeOutQuart, easeInCubic, easeOutQuart] },
              y: { times: [0, 0.58, 0.62, 1], ease: ['linear', 'linear', easeOutQuart] },
            },
          },
        }}
      >
        <path d="m14 13-8.381 8.38a1 1 0 0 1-3.001-3l8.384-8.381" />
        <path d="m16 16 6-6" />
        <path d="m21.5 10.5-8-8" />
        <path d="m8 8 6-6" />
        <path d="m8.5 7.5 8 8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'gavel',
  gesture: 'order in the court',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['law', 'judge', 'auction', 'gavel'],
}

export default GavelIcon
