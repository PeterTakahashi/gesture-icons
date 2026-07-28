import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart } from '../core/easings'

/**
 * Timer — one lap on the dial. The top button presses first — cause — and
 * only once it is down does the hand sweep a full lap about the dial's
 * center and land back home — effect. The dial itself never moves.
 * Base geometry: Lucide `timer` (ISC).
 */
const DUR = 1.1
const SWEEP_EASE: [number, number, number, number] = [0.5, 0, 0.3, 1]

export function TimerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'timer'}
      {...hoverProps}
    >
      {/* the button — pressed first, the cause */}
      <motion.line
        x1="10" x2="14" y1="2" y2="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, 0],
            transition: { duration: DUR, times: [0, 0.08, 0.16], ease: easeOutQuart },
          },
        }}
      />
      {/* the hand — the effect, one lap about the dial center */}
      <motion.line
        x1="12" x2="15" y1="14" y2="11"
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, 360],
            transition: { duration: DUR, times: [0, 0.16, 1], ease: ['linear', SWEEP_EASE] },
          },
        }}
      />
      <circle cx="12" cy="14" r="8" />
    </svg>
  )
}

export const meta = {
  name: 'timer',
  gesture: 'one lap on the dial',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['stopwatch', 'countdown', 'time'],
}

export default TimerIcon
