import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Ratio — it makes its move. There is no separate corner handle here, only
 * the two frames themselves — so each frame IS its own handle: the tall
 * portrait frame NUDGEs along its long (vertical) axis, the wide landscape
 * frame NUDGEs along its long (horizontal) axis, both outward with a small
 * wind-up and a settleBack, on one shared clock — the two ratios flexing
 * once, side by side, and landing exactly as Lucide drew them.
 * Base geometry: Lucide `ratio` (ISC).
 */
const DUR = 0.85

export function RatioIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ratio'}
      {...hoverProps}
    >
      <motion.rect
        width="12" height="20" x="6" y="2" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.96, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.rect
        width="20" height="12" x="2" y="6" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 0.96, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ratio',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['frame', 'select', 'ratio'],
}

export default RatioIcon
