import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Hotel — checked in. The building takes a short settling press (the
 * weight of an arrival), and the door mark pops a hair larger right after —
 * a guest stepping through. Base geometry: Lucide `hotel` (ISC).
 */
const DUR = 0.85

export function HotelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hotel'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.42, 1], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M12 11h.01" />
        <path d="M12 7h.01" />
        <path d="M16 11h.01" />
        <path d="M16 7h.01" />
        <path d="M8 11h.01" />
        <path d="M8 7h.01" />
        <rect x="4" y="2" width="16" height="20" rx="2" />
      </motion.g>
      {/* the door — someone passes through it */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.22, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.66, 0.92], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M10 22v-6.57" />
        <path d="M14 15.43V22" />
        <path d="M15 16a5 5 0 0 0-6 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hotel',
  gesture: 'checked in',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['stay', 'travel', 'lodging'],
}

export default HotelIcon
