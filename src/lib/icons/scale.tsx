import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Scale — it weighs and levels. The beam and its two pans tip about the
 * post's top pivot, decaying swings settling to level — a balance actually
 * weighing something, not just wobbling. The center post and base hold
 * still; they are the fixed stand, not the beam.
 * Base geometry: Lucide `scale` (ISC).
 */
const DUR = 1.25

export function ScaleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scale'}
      {...hoverProps}
    >
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 0.6, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m19 8 3 8a5 5 0 0 1-6 0zV7" />
        <path d="M3 7h1a17 17 0 0 0 8-2 17 17 0 0 0 8 2h1" />
        <path d="m5 8 3 8a5 5 0 0 1-6 0zV7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scale',
  gesture: 'it weighs and levels',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['balance', 'justice', 'law', 'compare'],
}

export default ScaleIcon
