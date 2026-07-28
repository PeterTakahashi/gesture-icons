import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Angry — it fumes. A fast decaying shake with the brow marks pressing
 * down and holding through the shake — steam held in, not let out — before
 * everything settles back to composed.
 * Base geometry: Lucide `angry` (ISC).
 */
const DUR = 0.65

export function AngryIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const browVariants = {
    normal: { y: 0 },
    animate: {
      y: [0, 0.5, 0.5, 0],
      transition: { duration: DUR, times: [0, 0.14, 0.75, 1], ease: [easeOutQuart, 'linear' as const, easeInOutCubic] },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'angry'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 2, -1.5, 1, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M16 16s-1.5-2-4-2-4 2-4 2" />
        <motion.path d="M7.5 8 10 9" initial="normal" animate={controls} variants={browVariants} />
        <motion.path d="m14 9 2.5-1" initial="normal" animate={controls} variants={browVariants} />
        <path d="M9 10h.01" />
        <path d="M15 10h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'angry',
  gesture: 'it fumes',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['mad', 'face', 'upset'],
}

export default AngryIcon
