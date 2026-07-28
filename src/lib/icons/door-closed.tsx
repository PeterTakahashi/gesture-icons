import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Door closed — the handle turns. A dot cannot show rotation, so instead
 * the knob presses like a handle being tried while the whole door gives one
 * small shake, hinged at its own left edge — someone finding it locked.
 * Base geometry: Lucide `door-closed` (ISC).
 */
const DUR = 0.8

export function DoorClosedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'door closed'}
      {...hoverProps}
    >
      <path d="M2 20h20" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -0.6, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 0.85], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 20V6a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v14" />
        <motion.path
          d="M10 12h.01"
          style={{ transformBox: 'view-box', transformOrigin: '10px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.7, 1.15, 1],
              transition: { duration: DUR, times: [0, 0.2, 0.45, 0.7], ease: [easeInCubic, settleBack, easeOutQuart] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'door-closed',
  gesture: 'the handle turns',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['room', 'closed'],
}

export default DoorClosedIcon
