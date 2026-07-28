import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Drill — it bites in. The body and bit shake fast while nudging toward the
 * bit's own direction — one hole drilled and withdrawn — while the trigger
 * hand stays put, the only steady thing in a shaking tool.
 * Base geometry: Lucide `drill` (ISC).
 */
const DUR = 0.65

export function DrillIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'drill'}
      {...hoverProps}
    >
      {/* trigger hand — steady */}
      <path d="M10 18a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H5a3 3 0 0 1-3-3 1 1 0 0 1 1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -0.7, -0.3, -0.8, -0.3, 0],
            y: [0, 0.5, 0.9, 0.6, 1, 0],
            rotate: [0, -1, 1, -1, 1, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.4, 0.6, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M13 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1l-.81 3.242a1 1 0 0 1-.97.758H8" />
        <path d="M14 4h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1h-3" />
        <path d="M18 6h4" />
        <path d="m5 10-2 8" />
        <path d="m7 18 2-8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'drill',
  gesture: 'it bites in',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['power', 'build', 'tool'],
}

export default DrillIcon
