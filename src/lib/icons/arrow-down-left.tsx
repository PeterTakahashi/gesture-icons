import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Arrow down-left — it tucks back in. One rigid nudge along its own
 * diagonal: wind-up back toward the tail, drive out past the tip, settle
 * home.
 * Base geometry: Lucide `arrow-down-left` (ISC).
 */
const DUR = 0.8

export function ArrowDownLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow down left'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.1, -2.2, 0],
            y: [0, -1.1, 2.2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M17 7 7 17" />
        <path d="M17 17H7V7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'arrow-down-left',
  gesture: 'it tucks back in',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['diagonal', 'return'],
}

export default ArrowDownLeftIcon
