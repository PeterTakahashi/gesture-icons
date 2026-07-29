import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Split square vertical — the two halves split. Each bracket nudges outward
 * along the vertical split axis with a small inward wind-up, then returns
 * home; the center divider — the split itself — holds still.
 * Base geometry: Lucide `split-square-vertical` (ISC).
 */
const DUR = 0.85

function half(dir: 1 | -1): Variants {
  return {
    normal: { y: 0 },
    animate: {
      y: [0, -0.4 * dir, 1.5 * dir, 0],
      transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SplitSquareVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'split square vertical'}
      {...hoverProps}
    >
      <line x1="4" x2="20" y1="12" y2="12" />
      <motion.path d="M5 8V5c0-1 1-2 2-2h10c1 0 2 1 2 2v3" initial="normal" animate={controls} variants={half(-1)} />
      <motion.path d="M19 16v3c0 1-1 2-2 2H7c-1 0-2-1-2-2v-3" initial="normal" animate={controls} variants={half(1)} />
    </svg>
  )
}

export const meta = {
  name: 'split-square-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['layout', 'arrange', 'split', 'square', 'vertical'],
}

export default SplitSquareVerticalIcon
