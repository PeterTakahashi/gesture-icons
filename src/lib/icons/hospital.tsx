import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Hospital — the cross calls. The cross mark (vertical and horizontal
 * strokes together) pulses twice about its own center, calmly — help here.
 * The building and its door never move.
 * Base geometry: Lucide `hospital` (ISC).
 */
const DUR = 1.1

export function HospitalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hospital'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.15, 1, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 7v4" />
        <path d="M14 9h-4" />
      </motion.g>
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M18 11h2a2 2 0 0 1 2 2v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-9a2 2 0 0 1 2-2h2" />
      <path d="M18 21V5a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16" />
    </svg>
  )
}

export const meta = {
  name: 'hospital',
  gesture: 'the cross calls',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['medical', 'emergency'],
}

export default HospitalIcon
