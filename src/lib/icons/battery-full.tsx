import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'

/**
 * Battery full — it tops up. The three cell bars vanish and re-arrive left
 * to right, each collapsing to nothing about its own x-position and
 * snapping back — since a vertical bar's ink has no horizontal extent
 * beyond its stroke width, scaling that width to 0.001 is a true hide, not
 * a fade. Staggered 80ms apart, it reads as the cell filling up. The shell
 * never moves.
 * Base geometry: Lucide `battery-full` (ISC).
 */
const DUR = 0.9

export function BatteryFullIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (x: number, y: number, delay: number) => ({
    style: { transformBox: 'view-box' as const, transformOrigin: `${x}px ${y}px` },
    variants: {
      normal: { scaleX: 1 },
      animate: {
        scaleX: [1, 1, 0.001, 0.001, 1],
        transition: { duration: DUR, delay, times: [0, 0.2, 0.4, 0.58, 0.78], ease: 'easeInOut' as const },
      },
    },
  })
  const b1 = bar(6, 12, 0)
  const b2 = bar(10, 12, 0.08)
  const b3 = bar(14, 12, 0.16)
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'battery full'}
      {...hoverProps}
    >
      <motion.path d="M6 10v4" style={b1.style} initial="normal" animate={controls} variants={b1.variants} />
      <motion.path d="M10 10v4" style={b2.style} initial="normal" animate={controls} variants={b2.variants} />
      <motion.path d="M14 10v4" style={b3.style} initial="normal" animate={controls} variants={b3.variants} />
      <path d="M22 14v-4" />
      <rect x="2" y="6" width="16" height="12" rx="2" />
    </svg>
  )
}

export const meta = {
  name: 'battery-full',
  gesture: 'it tops up',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['power', 'charged'],
}

export default BatteryFullIcon
