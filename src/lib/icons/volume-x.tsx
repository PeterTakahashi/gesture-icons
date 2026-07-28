import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Volume X — the sound is cut. The X SHAKEs a head-shake "no" about its
 * own center, decaying with each swing, while the speaker beside it never
 * moves — muted; then rest.
 * Base geometry: Lucide `volume-x` (ISC).
 */
const DUR = 0.85

export function VolumeXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'volume muted'}
      {...hoverProps}
    >
      <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <line x1="22" x2="16" y1="9" y2="15" />
        <line x1="16" x2="22" y1="9" y2="15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'volume-x',
  gesture: 'the sound is cut',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['mute', 'silent', 'off'],
}

export default VolumeXIcon
