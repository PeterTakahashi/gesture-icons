import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Server — the LEDs blink. The rack itself never moves; only the two
 * activity LEDs step on and off, a true binary blink with no fade. The top
 * LED blinks twice, the bottom answers with one — disk activity, not decor.
 * Base geometry: Lucide `server` (ISC).
 */
const DUR = 1.0

export function ServerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'server'}
      {...hoverProps}
    >
      <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
      <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
      {/* top LED: two blinks */}
      <motion.line
        x1="6" x2="6.01" y1="6" y2="6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.08, 0.09, 0.2, 0.21, 0.32, 0.33, 0.44, 0.45, 0.55],
              ease: 'linear',
            },
          },
        }}
      />
      {/* bottom LED: answers with one, after the top settles */}
      <motion.line
        x1="6" x2="6.01" y1="18" y2="18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1],
            transition: { duration: DUR, times: [0, 0.62, 0.63, 0.76, 0.77, 1], ease: 'linear' },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'server',
  gesture: 'the LEDs blink',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['backend', 'host', 'rack', 'infra'],
}

export default ServerIcon
