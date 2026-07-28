import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Waves — they roll through. Each line nudges forward and back in sequence,
 * top (the furthest wave) first, each 8% of the beat behind the last — a
 * set rolling in one after another.
 * Base geometry: Lucide `waves` (ISC).
 */
const LINE_DUR = 0.7
const STEP = 0.09

export function WavesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const line = (delay: number) => ({
    normal: { x: 0 },
    animate: {
      x: [0, 2, 0],
      transition: { duration: LINE_DUR, delay, times: [0, 0.5, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'waves'}
      {...hoverProps}
    >
      <motion.path d="M2 5q2.5 2 5 0t5 0 5 0 5 0" initial="normal" animate={controls} variants={line(0)} />
      <motion.path d="M2 12q2.5 2 5 0t5 0 5 0 5 0" initial="normal" animate={controls} variants={line(STEP)} />
      <motion.path d="M2 19q2.5 2 5 0t5 0 5 0 5 0" initial="normal" animate={controls} variants={line(2 * STEP)} />
    </svg>
  )
}

export const meta = {
  name: 'waves',
  gesture: 'they roll through',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['sea', 'ocean', 'water'],
}

export default WavesIcon
