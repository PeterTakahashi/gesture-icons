import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutExpo, easeOutQuart } from '../core/easings'

/**
 * Battery charging — it charges. The bolt drains away and rewrites itself
 * fast (energy arriving, not a progress bar), then the shell takes one
 * contented breath now that power is flowing. One clock, in sequence.
 * Base geometry: Lucide `battery-charging` (ISC).
 */
const DUR = 1.0

export function BatteryChargingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'battery charging'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.6, 0.8, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M14.856 6H16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.935" />
        <path d="M22 14v-4" />
        <path d="M5.14 18H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h2.936" />
      </motion.g>
      <motion.path
        d="m11 7-3 5h4l-3 5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.3, 0.6], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'battery-charging',
  gesture: 'it charges',
  family: 'draw-on' as const,
  section: 'Objects',
  tags: ['power', 'energy', 'charge'],
}

export default BatteryChargingIcon
