import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Toggle right — it switches back. Mirror of `toggle-left.tsx`: the knob
 * travels to the far end of the track — cx 15 to cx 9, `toggle-left.tsx`'s
 * own resting spot — with the same settled overshoot, holds, and returns.
 * The track never moves.
 * Base geometry: Lucide `toggle-right` (ISC).
 */
const DUR = 1.0

export function ToggleRightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'toggle right'}
      {...hoverProps}
    >
      <motion.circle
        cx="15" cy="12" r="3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -6.3, -6, -6, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.42, 0.66, 1], ease: [easeInCubic, settleBack, 'linear', easeInOutCubic] },
          },
        }}
      />
      <rect width="20" height="14" x="2" y="5" rx="7" />
    </svg>
  )
}

export const meta = {
  name: 'toggle-right',
  gesture: 'it switches back',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['switch', 'on', 'setting'],
}

export default ToggleRightIcon
