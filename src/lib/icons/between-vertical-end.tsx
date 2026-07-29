import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Between vertical end — it does what it means. The separator arrow, which
 * points up, NUDGEs toward the direction it points and settles back home;
 * the two panels it sits between — the static rails — never move.
 * Base geometry: Lucide `between-vertical-end` (ISC).
 */
const DUR = 0.75

export function BetweenVerticalEndIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'between vertical end'}
      {...hoverProps}
    >
      <rect width="7" height="13" x="3" y="3" rx="1" />
      <motion.path
        d="m9 22 3-3 3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <rect width="7" height="13" x="14" y="3" rx="1" />
    </svg>
  )
}

export const meta = {
  name: 'between-vertical-end',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'between', 'vertical', 'end'],
}

export default BetweenVerticalEndIcon
