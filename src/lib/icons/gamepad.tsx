import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Gamepad — it takes the input. The two action buttons fire in sequence,
 * A then B 80ms apart, and the body shakes a hair on each press — the
 * controller feeling its own buttons. The d-pad never moves.
 * Base geometry: Lucide `gamepad-2` (ISC).
 */
const DUR = 0.75

export function GamepadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = (delay: number) => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.6, 1.25, 1],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.46, 0.7], ease: [easeInCubic, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'gamepad'}
      {...hoverProps}
    >
      <motion.path
        d="M17.32 5H6.68a4 4 0 0 0-3.978 3.59c-.006.052-.01.101-.017.152C2.604 9.416 2 14.456 2 16a3 3 0 0 0 3 3c1 0 1.5-.5 2-1l1.414-1.414A2 2 0 0 1 9.828 16h4.344a2 2 0 0 1 1.414.586L17 18c.5.5 1 1 2 1a3 3 0 0 0 3-3c0-1.545-.604-6.584-.685-7.258-.007-.05-.011-.1-.017-.151A4 4 0 0 0 17.32 5z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1, 1, 0, -1, 1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.28, 0.34, 0.5, 0.56, 0.62], ease: easeInOutCubic },
          },
        }}
      />
      <line x1="6" x2="10" y1="11" y2="11" />
      <line x1="8" x2="8" y1="9" y2="13" />
      <motion.line
        x1="15" x2="15.01" y1="12" y2="12"
        style={{ transformBox: 'view-box', transformOrigin: '15px 12px' }}
        initial="normal" animate={controls} variants={press(0)}
      />
      <motion.line
        x1="18" x2="18.01" y1="10" y2="10"
        style={{ transformBox: 'view-box', transformOrigin: '18px 10px' }}
        initial="normal" animate={controls} variants={press(0.08)}
      />
    </svg>
  )
}

export const meta = {
  name: 'gamepad',
  gesture: 'it takes the input',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['game', 'controller', 'play'],
}

export default GamepadIcon
