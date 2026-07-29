import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Log in — it steps inside. Mirror of `log-out.tsx`: the arrow snaps back
 * off-frame to the left in a near-instant beat (genuinely gone, not faded),
 * then travels back in on a long ease-out, arriving through the doorway;
 * the door bracket takes a small nudge as it lands.
 * Base geometry: Lucide `log-in` (ISC).
 */
const DUR = 1.1

export function LogInIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'log in'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -10, -10, 0],
            transition: { duration: DUR, times: [0, 0.05, 0.15, 1], ease: [easeInCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="m10 17 5-5-5-5" />
        <path d="M15 12H3" />
      </motion.g>
      <motion.path
        d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.85, 0.92, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'log-in',
  gesture: 'it steps inside',
  family: 'travel' as const,
  section: 'Interface',
  tags: ['enter', 'sign-in', 'log'],
}

export default LogInIcon
