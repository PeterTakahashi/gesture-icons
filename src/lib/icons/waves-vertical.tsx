import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Waves vertical — they roll through. VARIANT(waves): each line nudges
 * along its own (vertical) axis, left to right, each 8% of the beat behind
 * the last, same language as waves.tsx rotated ninety degrees.
 * Base geometry: Lucide `waves-vertical` (ISC).
 */
const LINE_DUR = 0.7
const STEP = 0.06

const line = (delay: number): Variants => ({
  normal: { y: 0 },
  animate: {
    y: [0, 2, 0],
    transition: { duration: LINE_DUR, delay, times: [0, 0.5, 1], ease: easeInOutCubic },
  },
})

export function WavesVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'waves vertical'}
      {...hoverProps}
    >
      <motion.path d="M5 2q2 2.5 0 5t0 5 0 5 0 5" initial="normal" animate={controls} variants={line(0)} />
      <motion.path d="M12 2q2 2.5 0 5t0 5 0 5 0 5" initial="normal" animate={controls} variants={line(STEP)} />
      <motion.path d="M19 2q2 2.5 0 5t0 5 0 5 0 5" initial="normal" animate={controls} variants={line(2 * STEP)} />
    </svg>
  )
}

export const meta = {
  name: 'waves-vertical',
  gesture: 'they roll through',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['wave', 'signal', 'waves', 'vertical'],
}

export default WavesVerticalIcon
