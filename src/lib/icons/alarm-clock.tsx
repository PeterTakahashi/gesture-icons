import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Alarm clock — it goes off. The body SHAKEs ±3° fast about the point
 * where its two feet meet the ground, (12, 21) — derived from the feet
 * paths' shared endpoint y. The bell caps up top rattle counter-phase,
 * each hinged at the point nearer the body, lagging ~3% behind the body's
 * own rock (inertia arrives late on a loose part). Both decay to a stop.
 * Base geometry: Lucide `alarm-clock` (ISC).
 */
const DUR = 0.6
const LAG = DUR * 0.03

export function AlarmClockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'alarm clock'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 3, -2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="13" r="8" />
        <path d="M12 9v4l2 2" />
        <path d="M6.38 18.7 4 21" />
        <path d="M17.64 18.67 20 21" />
      </motion.g>
      {/* bell caps: counter-phase, lagging the body's rock */}
      <motion.path
        d="M5 3 2 6"
        style={{ transformBox: 'view-box', transformOrigin: '5px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, -2, 1.3, -0.8, 0.4, 0],
            transition: { duration: DUR, delay: LAG, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="m22 6-3-3"
        style={{ transformBox: 'view-box', transformOrigin: '19px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, -2, 1.3, -0.8, 0.4, 0],
            transition: { duration: DUR, delay: LAG, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'alarm-clock',
  gesture: 'it goes off',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['wake', 'morning', 'ring'],
}

export default AlarmClockIcon
