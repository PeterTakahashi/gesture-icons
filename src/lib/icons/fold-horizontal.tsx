import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Fold horizontal — the two chevrons NUDGE inward toward the crease: a
 * small wind-up outward first, then a drive in past the mark, settling back
 * home — one clock, so the fold reads as meeting in the middle. The rails
 * and the dashed crease line are the fixed track, so they hold still.
 * Base geometry: Lucide `fold-horizontal` (ISC).
 */
const DUR = 0.8

export function FoldHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fold horizontal'}
      {...hoverProps}
    >
      <path d="M2 12h6" />
      <path d="M22 12h-6" />
      <path d="M12 2v2" />
      <path d="M12 8v2" />
      <path d="M12 14v2" />
      <path d="M12 20v2" />
      <motion.path
        d="m19 9-3 3 3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.5, -2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m5 15 3-3-3-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.5, 2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'fold-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['layout', 'arrange', 'fold', 'horizontal'],
}

export default FoldHorizontalIcon
