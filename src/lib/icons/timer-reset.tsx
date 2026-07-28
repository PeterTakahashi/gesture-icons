import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Timer reset — back to zero. The top knob PRESSes first — a quick dip and
 * release — and once it lands, the hand sweeps backward a full lap about
 * the dial's own center (12, 13), landing exactly on zero again. The body
 * and its reset-arrow tail never move; only the button and the hand act.
 * Base geometry: Lucide `timer-reset` (ISC).
 */
const DUR = 0.95
const PRESS_END = 0.22
const LAP_EASE: [number, number, number, number] = [0.4, 0, 0.3, 1]

export function TimerResetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'timer reset'}
      {...hoverProps}
    >
      <path d="M4 13a8 8 0 0 1 8-7 8 8 0 1 1-5.3 14L4 17.6" />
      <path d="M9 17H4v5" />
      <motion.path
        d="M10 2h4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.12, PRESS_END], ease: [easeInCubic, settleBack] },
          },
        }}
      />
      <motion.path
        d="M12 14v-4"
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -360],
            transition: { duration: DUR, times: [0, PRESS_END, 1], ease: ['linear', LAP_EASE] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'timer-reset',
  gesture: 'back to zero',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['restart', 'stopwatch'],
}

export default TimerResetIcon
