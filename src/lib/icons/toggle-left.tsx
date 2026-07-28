import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Toggle left — it switches over. The knob travels to the far end of the
 * track — cx 9 to cx 15, the mirrored resting position `toggle-right.tsx`
 * actually draws — with a settled overshoot, holds a beat, then eases back.
 * Spec called the throw 8 units; the track (x=2, width=20, rx=7) and the
 * mirrored icon's own knob position both put the true mirrored spot 6 units
 * over, so the throw uses the geometry's number instead. The track itself
 * never moves.
 * Base geometry: Lucide `toggle-left` (ISC).
 */
const DUR = 1.0

export function ToggleLeftIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'toggle left'}
      {...hoverProps}
    >
      <motion.circle
        cx="9" cy="12" r="3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 6.3, 6, 6, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.42, 0.66, 1], ease: [easeInCubic, settleBack, 'linear', easeInOutCubic] },
          },
        }}
      />
      <rect width="20" height="14" x="2" y="5" rx="7" />
    </svg>
  )
}

export const meta = {
  name: 'toggle-left',
  gesture: 'it switches over',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['switch', 'off', 'setting'],
}

export default ToggleLeftIcon
