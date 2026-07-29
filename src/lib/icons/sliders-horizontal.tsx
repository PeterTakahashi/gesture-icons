import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Sliders horizontal — the knobs slide. Each vertical knob nudges left or
 * right along its own horizontal track (alternating direction per knob) and
 * returns — settings being tried, one at a time. The tracks hold still.
 * Base geometry: Lucide `sliders-horizontal` (ISC).
 */
const DUR = 0.9

function knob(dir: 1 | -1, delay: number): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, -0.5 * dir, 2 * dir, 0],
      transition: { duration: DUR, delay, times: [0, 0.22, 0.58, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SlidersHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sliders horizontal'}
      {...hoverProps}
    >
      <path d="M10 5H3" />
      <path d="M21 5h-7" />
      <path d="M21 12h-9" />
      <path d="M8 12H3" />
      <path d="M12 19H3" />
      <path d="M21 19h-5" />
      <motion.path d="M14 3v4" initial="normal" animate={controls} variants={knob(1, 0)} />
      <motion.path d="M8 10v4" initial="normal" animate={controls} variants={knob(-1, 0.054)} />
      <motion.path d="M16 17v4" initial="normal" animate={controls} variants={knob(1, 0.108)} />
    </svg>
  )
}

export const meta = {
  name: 'sliders-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['settings', 'adjust', 'filters', 'sliders', 'horizontal'],
}

export default SlidersHorizontalIcon
