import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Between horizonal start — it does what it means. The separator arrow,
 * which points right, NUDGEs toward the direction it points and settles
 * back home; the two panels it sits between — the static rails — never
 * move.
 * Base geometry: Lucide `between-horizonal-start` (ISC).
 */
const DUR = 0.75

export function BetweenHorizonalStartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'between horizonal start'}
      {...hoverProps}
    >
      <rect width="13" height="7" x="8" y="3" rx="1" />
      <motion.path
        d="m2 9 3 3-3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <rect width="13" height="7" x="8" y="14" rx="1" />
    </svg>
  )
}

export const meta = {
  name: 'between-horizonal-start',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'between', 'horizonal', 'start'],
}

export default BetweenHorizonalStartIcon
