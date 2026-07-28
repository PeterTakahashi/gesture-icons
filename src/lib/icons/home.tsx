import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Home — it welcomes you back. The whole house takes a warm press-pulse,
 * scaling from the doorstep (where the door meets the ground) — a
 * hearth-beat, then still.
 * Base geometry: Lucide `house` (ISC).
 */
const DUR = 0.85

export function HomeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'home'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.05, 0.99, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.65, 1], ease: [easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'home',
  gesture: 'it welcomes you back',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['house', 'start', 'main'],
}

export default HomeIcon
