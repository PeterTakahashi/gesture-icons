import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cable car — it crosses the span. The cabin and its hanger rod sway
 * together about the point where the rod meets the cable, drifting
 * sideways with the wind over the valley, then settle. The cable itself
 * and the pylon marks never move.
 * Base geometry: Lucide `cable-car` (ISC).
 */
const DUR = 1.3

export function CableCarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cable car'}
      {...hoverProps}
    >
      <path d="M10 3h.01" />
      <path d="M14 2h.01" />
      <path d="m2 9 20-5" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 6.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, -4, 3, -1.5, 0],
            x: [0, 2, -1.2, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.56, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 12V6.5" />
        <rect width="16" height="10" x="4" y="12" rx="3" />
        <path d="M9 12v5" />
        <path d="M15 12v5" />
        <path d="M4 17h16" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cable-car',
  gesture: 'it crosses the span',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['gondola', 'mountain', 'lift', 'cable', 'car'],
}

export default CableCarIcon
