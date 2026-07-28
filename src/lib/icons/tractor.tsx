import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic } from '../core/easings'

/**
 * Tractor — it lugs forward. A slow, heavy nudge in first gear: the whole
 * machine advances a couple of units while the cab pitches back under
 * torque, hinged near the big rear wheel that leads the pull, then eases
 * back to rest. No bounce anywhere — a tractor doesn't spring.
 * Base geometry: Lucide `tractor` (ISC).
 */
const DUR = 1.3

export function TractorIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tractor'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 2, 2, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.55, 0.75, 1], ease: [easeInCubic, easeInOutCubic, 'linear', easeInOutCubic] },
          },
        }}
      >
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '7px 15px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -2, -2, 0],
              transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: easeInOutCubic },
            },
          }}
        >
          <path d="m10 11 11 .9a1 1 0 0 1 .8 1.1l-.665 4.158a1 1 0 0 1-.988.842H20" />
          <path d="M16 18h-5" />
          <path d="M18 5a1 1 0 0 0-1 1v5.573" />
          <path d="M3 4h8.129a1 1 0 0 1 .99.863L13 11.246" />
          <path d="M4 11V4" />
          <path d="M7 15h.01" />
          <path d="M8 10.1V4" />
        </motion.g>
        <circle cx="18" cy="18" r="2" />
        <circle cx="7" cy="15" r="5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tractor',
  gesture: 'it lugs forward',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['farm', 'field'],
}

export default TractorIcon
