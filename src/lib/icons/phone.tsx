import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Phone — it rings. The whole handset buzzes in place: a fast, decaying
 * vibration about the glyph's own center — the shudder of a phone going
 * off face-down on a table, not a swing or a wave.
 * Base geometry: Lucide `phone` (ISC).
 */
const DUR = 0.75

export function PhoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'phone'}
      {...hoverProps}
    >
      <motion.path
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -9, 8, -6, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.26, 0.4, 0.56, 0.74, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'phone',
  gesture: 'it rings',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['call', 'telephone', 'ring'],
}

export default PhoneIcon
