import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Rainbow — it appears after rain. All three arcs erase together, then a
 * pen draws them back on left to right, outer arc first, each following
 * band starting 60ms behind the one before it — the bow forming band by
 * band.
 * Base geometry: Lucide `rainbow` (ISC).
 */
const DUR = 1.1

export function RainbowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const arc = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.15, redrawStart, redrawEnd], ease: [easeInCubic, 'linear', pen] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rainbow'}
      {...hoverProps}
    >
      <motion.path d="M22 17a10 10 0 0 0-20 0" initial="normal" animate={controls} variants={arc(0.15, 0.55)} />
      <motion.path d="M6 17a6 6 0 0 1 12 0" initial="normal" animate={controls} variants={arc(0.21, 0.6)} />
      <motion.path d="M10 17a2 2 0 0 1 4 0" initial="normal" animate={controls} variants={arc(0.27, 0.65)} />
    </svg>
  )
}

export const meta = {
  name: 'rainbow',
  gesture: 'it appears after rain',
  family: 'draw-on' as const,
  section: 'Animals & nature',
  tags: ['weather', 'color', 'hope'],
}

export default RainbowIcon
