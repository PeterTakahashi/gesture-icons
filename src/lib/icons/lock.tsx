import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Lock — it locks shut. The shackle lifts clear of the body, holds a beat
 * open, then drops with gravity; the body takes the hit exactly on the
 * contact frame and settles back flat. Ends on the same locked picture
 * Lucide drew.
 * Base geometry: Lucide `lock` (ISC).
 */
const DUR = 1.0

export function LockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lock'}
      {...hoverProps}
    >
      <motion.path
        d="M7 11V7a5 5 0 0 1 10 0v4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.6, -2.6, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        width="18" height="11" x="3" y="11" rx="2" ry="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 0.85, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'lock',
  gesture: 'it locks shut',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['security', 'private', 'password'],
}

export default LockIcon
