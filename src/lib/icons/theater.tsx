import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Theater — the curtain rises. The pediment roofline and its draped sides —
 * everything above the stage floor — lift together and settle back down.
 * The floor line and the column bases hold their ground.
 * Base geometry: Lucide `theater` (ISC).
 */
const DUR = 0.9

export function TheaterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'theater'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, -1, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.6, 0.85, 1], ease: [easeOutQuart, 'linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M2 10s3-3 3-8" />
        <path d="M22 10s-3-3-3-8" />
        <path d="M10 2c0 4.4-3.6 8-8 8" />
        <path d="M14 2c0 4.4 3.6 8 8 8" />
        <path d="M2 10s2 2 2 5" />
        <path d="M22 10s-2 2-2 5" />
      </motion.g>
      <path d="M8 15h8" />
      <path d="M2 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
      <path d="M14 22v-1a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export const meta = {
  name: 'theater',
  gesture: 'the curtain rises',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['stage', 'drama', 'show', 'theater'],
}

export default TheaterIcon
