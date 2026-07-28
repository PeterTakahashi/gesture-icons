import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tornado — it spins through. The five stacked lines shear alternately —
 * top line one way, the next the other, tapering toward the tip — twice in
 * quick succession, all on one clock so the shear reads as a single
 * rotating funnel rather than five independent wiggles. Scary, but
 * contained: it never leaves its stack order.
 * Base geometry: Lucide `tornado` (ISC).
 */
const DUR = 0.75
const TIMES = [0, 0.22, 0.5, 0.75, 1]

export function TornadoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const shear = (amp: number) => ({
    normal: { x: 0 },
    animate: {
      x: [0, amp, 0, amp * 0.65, 0],
      transition: { duration: DUR, times: TIMES, ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tornado'}
      {...hoverProps}
    >
      <motion.path d="M21 4H3" initial="normal" animate={controls} variants={shear(2)} />
      <motion.path d="M18 8H6" initial="normal" animate={controls} variants={shear(-1.5)} />
      <motion.path d="M19 12H9" initial="normal" animate={controls} variants={shear(1)} />
      <motion.path d="M16 16h-6" initial="normal" animate={controls} variants={shear(-0.7)} />
      <motion.path d="M11 20H9" initial="normal" animate={controls} variants={shear(-0.5)} />
    </svg>
  )
}

export const meta = {
  name: 'tornado',
  gesture: 'it spins through',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['storm', 'wind', 'danger'],
}

export default TornadoIcon
