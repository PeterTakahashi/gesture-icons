import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Aperture — the blades contract. The six blades turn together about the
 * lens center and pull in slightly — an iris closing, not a wheel spinning —
 * hold for a beat, then open back. The outer ring never moves.
 * Base geometry: Lucide `aperture` (ISC).
 */
const DUR = 0.9

export function ApertureIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'aperture'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, 12, 12, 0],
            scale: [1, 0.94, 0.94, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="m14.31 8 5.74 9.94" />
        <path d="M9.69 8h11.48" />
        <path d="m7.38 12 5.74-9.94" />
        <path d="M9.69 16 3.95 6.06" />
        <path d="M14.31 16H2.83" />
        <path d="m16.62 12-5.74 9.94" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'aperture',
  gesture: 'the blades contract',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['camera', 'photo', 'lens', 'aperture'],
}

export default ApertureIcon
