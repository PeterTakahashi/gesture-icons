import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Fold vertical — the top and bottom halves pull toward the seam. Each
 * arrow-and-rail NUDGEs inward along the axis in the name: a small wind-up
 * away from center, a drive in past the mark, settleBack home. The dashed
 * fold line at the seam is the fixed thing being folded toward, so it holds.
 * Base geometry: Lucide `fold-vertical` (ISC).
 */
const DUR = 0.8
const WIND = 0.6
const DRIVE = 2

export function FoldVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fold vertical'}
      {...hoverProps}
    >
      {/* top arrow + rail nudges down toward the seam */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -WIND, DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 8V2" />
        <path d="m15 5-3 3-3-3" />
      </motion.g>
      {/* bottom arrow + rail nudges up toward the seam */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, WIND, -DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 22v-6" />
        <path d="m15 19-3-3-3 3" />
      </motion.g>
      {/* the fold line itself is fixed — the seam being folded toward */}
      <path d="M4 12H2" />
      <path d="M10 12H8" />
      <path d="M16 12h-2" />
      <path d="M22 12h-2" />
    </svg>
  )
}

export const meta = {
  name: 'fold-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['layout', 'arrange', 'fold', 'vertical'],
}

export default FoldVerticalIcon
