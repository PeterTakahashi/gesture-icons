import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pill — it is taken. The whole capsule turns 180° about its center with a
 * small hop, then sets back down — down the hatch. A capsule is symmetric
 * under a half turn, so the landing renders the identical picture Lucide
 * drew; the discrete reset to rotate:0 is invisible.
 * Base geometry: Lucide `pill` (ISC).
 */
const DUR = 0.85
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function PillIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pill'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, 186, 180],
            y: [0, -1, -1, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.75, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <path d="m10.5 20.5 10-10a4.95 4.95 0 1 0-7-7l-10 10a4.95 4.95 0 1 0 7 7Z" />
        <path d="m8.5 8.5 7 7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pill',
  gesture: 'it is taken',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['medicine', 'capsule', 'dose'],
}

export default PillIcon
