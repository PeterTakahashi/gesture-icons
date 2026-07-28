import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Grab — it grips. All four finger strokes close toward the palm together,
 * hit a firm stop, hold the grip a beat, then release back open — grabbed,
 * then let go. The palm itself never moves; it's what's being grabbed onto.
 * Base geometry: Lucide `grab` (ISC).
 */
const DUR = 0.85

export function GrabIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const fingerVariants = {
    normal: { y: 0 },
    animate: {
      y: [0, -0.2, 1, 1, 0],
      transition: {
        duration: DUR,
        times: [0, 0.15, 0.4, 0.7, 1],
        ease: [easeInOutCubic, easeOutQuart, 'linear' as const, settleBack],
      },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'grab'}
      {...hoverProps}
    >
      <motion.path d="M18 11.5V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" initial="normal" animate={controls} variants={fingerVariants} />
      <motion.path d="M14 10V8a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" initial="normal" animate={controls} variants={fingerVariants} />
      <motion.path d="M10 9.9V9a2 2 0 0 0-2-2a2 2 0 0 0-2 2v5" initial="normal" animate={controls} variants={fingerVariants} />
      <motion.path d="M6 14a2 2 0 0 0-2-2a2 2 0 0 0-2 2" initial="normal" animate={controls} variants={fingerVariants} />
      <path d="M18 11a2 2 0 1 1 4 0v3a8 8 0 0 1-8 8h-4a8 8 0 0 1-8-8 2 2 0 1 1 4 0" />
    </svg>
  )
}

export const meta = {
  name: 'grab',
  gesture: 'it grips',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['drag', 'hold', 'hand'],
}

export default GrabIcon
