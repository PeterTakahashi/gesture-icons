import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Waves ladder — the water rolls through. VARIANT(waves): only the wave
 * line nudges along its own axis, same language as waves.tsx. The rails
 * and rungs are the physical ladder — rigid, unmoved by water — so there
 * is only one line to roll and no stagger to spread across it.
 * Base geometry: Lucide `waves-ladder` (ISC).
 */
const DUR = 0.7

export function WavesLadderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'waves ladder'}
      {...hoverProps}
    >
      <path d="M19 5a2 2 0 0 0-2 2v11" />
      <path d="M7 13h10" />
      <path d="M7 9h10" />
      <path d="M9 5a2 2 0 0 0-2 2v11" />
      <motion.path
        d="M2 18c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 2.6 0 2.4 2 5 2 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 2, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'waves-ladder',
  gesture: 'the water rolls through',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['wave', 'signal', 'waves', 'ladder'],
}

export default WavesLadderIcon
