import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Phone outgoing — a call goes out. The arrow nudges outward, away from the
 * handset, first; once it settles, the handset gives one small ring wiggle —
 * dialing out.
 * Base geometry: Lucide `phone-outgoing` (ISC).
 */
const DUR = 1.0

export function PhoneOutgoingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'phone outgoing'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1, 1, 0],
            y: [0, 0.3, -1, -1, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.22, 0.36, 0.46], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="m16 8 6-6" />
        <path d="M22 8V2h-6" />
      </motion.g>
      <motion.path
        d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -6, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.46, 0.6, 0.74, 0.88, 1], ease: ['linear', easeInOutCubic, easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'phone-outgoing',
  gesture: 'a call goes out',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['call', 'dial'],
}

export default PhoneOutgoingIcon
