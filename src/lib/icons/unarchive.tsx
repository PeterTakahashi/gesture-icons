import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Unarchive — it comes back out. The arrow nudges straight up out of the
 * box with a small overshoot — retrieved — while the box dips as it lets go.
 * Base geometry: Lucide `archive-restore` (ISC).
 */
const DUR = 1.0

export function UnarchiveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'unarchive'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.9, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.42, 0.55, 0.72, 0.9], ease: ['linear', 'linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <rect width="20" height="5" x="2" y="3" rx="1" />
        <path d="M4 8v11a2 2 0 0 0 2 2h2" />
        <path d="M20 8v11a2 2 0 0 1-2 2h-2" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, -2.6, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.42, 0.75], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m9 15 3-3 3 3" />
        <path d="M12 12v9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'unarchive',
  gesture: 'it comes back out',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['unarchive', 'restore'],
}

export default UnarchiveIcon
