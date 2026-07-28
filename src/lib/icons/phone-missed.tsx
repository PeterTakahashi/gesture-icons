import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Phone missed — the call is missed. A small "no" wag from the X, and the
 * handset gives one soft sag and rights itself — just missed it.
 * Base geometry: Lucide `phone-missed` (ISC).
 */
const DUR = 0.85

export function PhoneMissedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'phone missed'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m16 2 6 6" />
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
            rotate: [0, 3, 0],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'phone-missed',
  gesture: 'the call is missed',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['call', 'missed', 'regret'],
}

export default PhoneMissedIcon
