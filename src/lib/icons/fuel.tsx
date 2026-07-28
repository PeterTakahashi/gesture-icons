import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Fuel — it fills up. The hose nudges in toward the pump body with a hard
 * click stop — docked — while the body takes a subtle press from the
 * connection, then the hose eases back out to rest. Topped off.
 * Base geometry: Lucide `fuel` (ISC).
 */
const DUR = 0.9

export function FuelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fuel'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.7, 1], ease: ['linear', easeInCubic, easeInOutCubic] },
          },
        }}
      >
        <path d="M14 21V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v16" />
        <path d="M2 21h13" />
        <path d="M3 9h11" />
      </motion.g>
      <motion.path
        d="M14 13h2a2 2 0 0 1 2 2v2a2 2 0 0 0 4 0v-6.998a2 2 0 0 0-.59-1.42L18 5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.3, -1.2, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.45, 0.7, 1], ease: [easeInCubic, easeOutQuint, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'fuel',
  gesture: 'it fills up',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['gas', 'petrol', 'station'],
}

export default FuelIcon
