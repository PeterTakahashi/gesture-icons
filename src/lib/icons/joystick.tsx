import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Joystick — it flicks the stick. The shaft and its ball rotate about the
 * base where the stick actually meets the platform, waggling once and
 * decaying home. Base and buttons never move.
 * Base geometry: Lucide `joystick` (ISC).
 */
const DUR = 0.7

export function JoystickIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'joystick'}
      {...hoverProps}
    >
      <path d="M21 17a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2Z" />
      <path d="M6 15v-2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 10, -5, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.74, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 15V9" />
        <circle cx="12" cy="6" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'joystick',
  gesture: 'it flicks the stick',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['arcade', 'game'],
}

export default JoystickIcon
