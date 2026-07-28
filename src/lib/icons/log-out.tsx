import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Log out — it steps out the door. The arrow (chevron + shaft) exits right
 * past the frame edge, is repositioned off-frame, and re-enters from
 * inside the doorway. The door bracket takes a small nudge as the arrow
 * passes through it.
 * Base geometry: Lucide `log-out` (ISC).
 */
const DUR = 1.1

export function LogOutIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'log out'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 10, 10, -6, -6, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.56, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="m16 17 5-5-5-5" />
        <path d="M21 12H9" />
      </motion.g>
      <motion.path
        d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.48, 0.58, 0.72], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'log-out',
  gesture: 'it steps out the door',
  family: 'travel' as const,
  section: 'Interface',
  tags: ['exit', 'sign-out', 'leave'],
}

export default LogOutIcon
