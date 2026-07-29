import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint, gravity, easeOutQuart } from '../core/easings'

/**
 * Motorbike — it revs and wheelies. The frame, front wheel and exhaust are
 * one rigid assembly that leans back about the rear wheel's contact patch
 * (the only part that never leaves the ground) — a compressing rev dip,
 * the front coming up with a forward surge, and a fork-compression dip as
 * it lands. The rear wheel itself is the still pivot.
 * Base geometry: Lucide `motorbike` (ISC).
 */
const DUR = 0.9

export function MotorbikeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'motorbike'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, 1.2, -4, 1.2, 0],
            x: [0, -0.3, 2, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.5, 0.74, 1], ease: [easeInOutCubic, easeOutQuint, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="m18 14-1-3" />
        <path d="m3 9 6 2a2 2 0 0 1 2-2h2a2 2 0 0 1 1.99 1.81" />
        <path d="M8 17h3a1 1 0 0 0 1-1 6 6 0 0 1 6-6 1 1 0 0 0 1-1v-.75A5 5 0 0 0 17 5" />
        <circle cx="5" cy="17" r="3" />
      </motion.g>
      <circle cx="19" cy="17" r="3" />
    </svg>
  )
}

export const meta = {
  name: 'motorbike',
  gesture: 'it revs and wheelies',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['motorcycle', 'ride', 'speed', 'motorbike'],
}

export default MotorbikeIcon
