import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Sliders — the knobs slide. Each horizontal knob nudges up or down along
 * its own vertical track (alternating direction per knob) and returns —
 * settings being tried, one at a time. The tracks themselves hold still.
 * Base geometry: Lucide `sliders` (ISC).
 */
const DUR = 0.9

function knob(dir: 1 | -1, delay: number): Variants {
  return {
    normal: { y: 0 },
    animate: {
      y: [0, -0.5 * dir, 2 * dir, 0],
      transition: { duration: DUR, delay, times: [0, 0.22, 0.58, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SlidersIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sliders'}
      {...hoverProps}
    >
      <path d="M12 21v-9" />
      <path d="M12 8V3" />
      <path d="M19 12V3" />
      <path d="M19 21v-5" />
      <path d="M5 10V3" />
      <path d="M5 21v-7" />
      <motion.path d="M3 14h4" initial="normal" animate={controls} variants={knob(1, 0)} />
      <motion.path d="M10 8h4" initial="normal" animate={controls} variants={knob(-1, 0.054)} />
      <motion.path d="M17 16h4" initial="normal" animate={controls} variants={knob(1, 0.108)} />
    </svg>
  )
}

export const meta = {
  name: 'sliders',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['settings', 'adjust', 'filters', 'sliders'],
}

export default SlidersIcon
