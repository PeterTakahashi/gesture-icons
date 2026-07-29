import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Split square horizontal — the two halves split. Each bracket nudges
 * outward along the horizontal split axis with a small inward wind-up, then
 * returns home; the center divider — the split itself — holds still.
 * Base geometry: Lucide `split-square-horizontal` (ISC).
 */
const DUR = 0.85

function half(dir: 1 | -1): Variants {
  return {
    normal: { x: 0 },
    animate: {
      x: [0, -0.4 * dir, 1.5 * dir, 0],
      transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
    },
  }
}

export function SplitSquareHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'split square horizontal'}
      {...hoverProps}
    >
      <line x1="12" x2="12" y1="4" y2="20" />
      <motion.path d="M8 19H5c-1 0-2-1-2-2V7c0-1 1-2 2-2h3" initial="normal" animate={controls} variants={half(-1)} />
      <motion.path d="M16 5h3c1 0 2 1 2 2v10c0 1-1 2-2 2h-3" initial="normal" animate={controls} variants={half(1)} />
    </svg>
  )
}

export const meta = {
  name: 'split-square-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['layout', 'arrange', 'split', 'square', 'horizontal'],
}

export default SplitSquareHorizontalIcon
