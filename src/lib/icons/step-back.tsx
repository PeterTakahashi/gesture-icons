import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Step back — it steps back. The triangle winds up toward the stop bar,
 * touching it (the bar gets a small contact nudge), then drives back past
 * rest in the direction it points before settling home.
 * Base geometry: Lucide `step-back` (ISC).
 */
const DUR = 0.75

export function StepBackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'step back'}
      {...hoverProps}
    >
      <motion.path
        d="M13.971 4.285A2 2 0 0 1 17 6v12a2 2 0 0 1-3.029 1.715l-9.997-5.998a2 2 0 0 1-.003-3.432z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.9, -1.8, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, settleBack] },
          },
        }}
      />
      <motion.path
        d="M21 20V4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, 0, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 1], ease: [easeInOutCubic, settleBack, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'step-back',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['navigate', 'step', 'back'],
}

export default StepBackIcon
