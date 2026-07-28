import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Goal — the flag waves. Lucide draws the flagpole and its flag as one
 * unbroken path (there is no separate rigid pole to hold still against),
 * so the whole flag-on-its-stem waves together, hinged where it plants
 * into the summit rings below — those rings are the still post.
 * Base geometry: Lucide `goal` (ISC).
 */
const DUR = 1.0

export function GoalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'goal'}
      {...hoverProps}
    >
      <motion.path
        d="M12 13V2l8 4-8 4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M20.561 10.222a9 9 0 1 1-12.55-5.29" />
      <path d="M8.002 9.997a5 5 0 1 0 8.9 2.02" />
    </svg>
  )
}

export const meta = {
  name: 'goal',
  gesture: 'the flag marks it',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['milestone', 'achievement'],
}

export default GoalIcon
