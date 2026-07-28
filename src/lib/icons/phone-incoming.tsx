import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Phone incoming — a call comes in. VARIANT(phone): the handset buzzes its
 * usual ring, while the arrow nudges inward toward it on the very first
 * ring — the call landing.
 * Base geometry: Lucide `phone-incoming` (ISC).
 */
const DUR = 0.85

export function PhoneIncomingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'phone incoming'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.3, -1, 0],
            y: [0, -0.3, 1, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.24, 0.4], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 2v6h6" />
        <path d="m22 2-6 6" />
      </motion.g>
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
  name: 'phone-incoming',
  gesture: 'a call comes in',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['call', 'receive'],
}

export default PhoneIncomingIcon
