import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Thermometer — it runs a fever. A fast shiver about the bulb at its base,
 * decaying quickly — a shake, not a swing.
 * Lucide draws this glyph as a single outline with no separate mercury
 * stroke, so there is nothing internal to stretch; the shiver on the whole
 * shape carries the gesture.
 * Base geometry: Lucide `thermometer` (ISC).
 */
const DUR = 0.7

export function ThermometerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'thermometer'}
      {...hoverProps}
    >
      <motion.path
        d="M14 4v10.54a4 4 0 1 1-4 0V4a2 2 0 0 1 4 0Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2.5, 2, -1.5, 1, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.38, 0.58, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'thermometer',
  gesture: 'it runs a fever',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['temperature', 'heat', 'weather', 'health'],
}

export default ThermometerIcon
