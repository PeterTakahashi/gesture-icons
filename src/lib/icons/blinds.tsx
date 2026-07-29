import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Blinds — they tilt open. Each slat scales down to a sliver about its own
 * centerline, top slat first, each next one starting 5% later — light let
 * in for a beat — then every slat closes back to privacy.
 * Base geometry: Lucide `blinds` (ISC).
 */
const DUR = 1.0
const SLATS = [
  { d: 'M20 7H8', origin: '14px 7px' },
  { d: 'M20 11H8', origin: '14px 11px' },
  { d: 'M8 15h12', origin: '14px 15px' },
  { d: 'M10 19h10', origin: '15px 19px' },
]

export function BlindsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'blinds'}
      {...hoverProps}
    >
      <path d="M3 3h18" />
      <path d="M4 3v14" />
      <circle cx="4" cy="19" r="2" />
      {SLATS.map((s, i) => (
        <motion.path
          key={s.d}
          d={s.d}
          style={{ transformBox: 'view-box', transformOrigin: s.origin }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleY: 1 },
            animate: {
              scaleY: [1, 0.5, 1],
              transition: { duration: DUR, delay: i * 0.05, times: [0, 0.4, 0.85], ease: easeInOutCubic },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'blinds',
  gesture: 'they tilt open',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['window', 'shade', 'light', 'blinds'],
}

export default BlindsIcon
