import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Annoyed — it side-eyes. The eyes nudge aside together, hold there
 * pointedly, then return — a deliberate glance, not a twitch. The mouth
 * never moves; the whole point is that the face stays flat while the eyes
 * do the talking.
 * Base geometry: Lucide `annoyed` (ISC).
 */
const DUR = 0.9

export function AnnoyedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const eyeVariants = {
    normal: { x: 0 },
    animate: {
      x: [0, -0.3, 1, 1, 0],
      transition: {
        duration: DUR,
        times: [0, 0.18, 0.42, 0.75, 1],
        ease: [easeInOutCubic, settleBack, 'linear' as const, easeOutQuart],
      },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'annoyed'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M8 15h8" />
      <motion.path d="M8 9h2" initial="normal" animate={controls} variants={eyeVariants} />
      <motion.path d="M14 9h2" initial="normal" animate={controls} variants={eyeVariants} />
    </svg>
  )
}

export const meta = {
  name: 'annoyed',
  gesture: 'it side-eyes',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['irritated', 'face'],
}

export default AnnoyedIcon
