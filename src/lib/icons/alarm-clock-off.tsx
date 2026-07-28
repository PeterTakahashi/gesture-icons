import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, pen } from '../core/easings'

/**
 * Alarm clock off — five more minutes. The body gives one final, decaying
 * half-shake about the frame center while the slash pen-draws across at the
 * same time, both settling together — the shake stops exactly as the slash
 * finishes, snoozed.
 * Base geometry: Lucide `alarm-clock-off` (ISC).
 */
const DUR = 0.9

export function AlarmClockOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'alarm clock off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M6.87 6.87a8 8 0 1 0 11.26 11.26" />
        <path d="M19.9 14.25a8 8 0 0 0-9.15-9.15" />
        <path d="m22 6-3-3" />
        <path d="M6.26 18.67 4 21" />
        <path d="M4 4 2 6" />
      </motion.g>
      {/* the slash: written on at the same time the shake plays itself out */}
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.3, 0.9], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'alarm-clock-off',
  gesture: 'five more minutes',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['snooze', 'off'],
}

export default AlarmClockOffIcon
