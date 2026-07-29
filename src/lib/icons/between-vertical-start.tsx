import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Between vertical start — the insertion marker does the inserting. The
 * chevron above the gap winds up, then drives down into the space between
 * the two static rails and settles back to its resting height above them.
 * Base geometry: Lucide `between-vertical-start` (ISC).
 */
const DUR = 0.8

export function BetweenVerticalStartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'between vertical start'}
      {...hoverProps}
    >
      <rect width="7" height="13" x="3" y="8" rx="1" />
      <motion.path
        d="m15 2-3 3-3-3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.7, 1.8, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.62, 0.84, 1], ease: [easeInOutCubic, easeOutQuart, settleBack, easeOutQuart] },
          },
        }}
      />
      <rect width="7" height="13" x="14" y="8" rx="1" />
    </svg>
  )
}

export const meta = {
  name: 'between-vertical-start',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['layout', 'arrange', 'between', 'vertical', 'start'],
}

export default BetweenVerticalStartIcon
