import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Feather — it drifts down. A stiff quill doesn't bend, so the whole shape
 * rides one wavering fall-and-rise: alternating sway and tilt on the same
 * clock as the drop, an air-resistance ease instead of gravity — then it
 * floats back up to exactly where it started. Weightlessness demonstrated.
 * Base geometry: Lucide `feather` (ISC).
 */
const DUR = 1.3

export function FeatherIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'feather'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, 1.5, -1.5, 1, -1, 0.5, 0],
            y: [0, 0.6, 1.6, 2, 1.2, 0.4, 0],
            rotate: [0, 6, -6, 4, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.34, 0.5, 0.68, 0.84, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M14.086 18.412A2 2 0 01 12.67 19H5v-7.672a2 2 0 01.586-1.414L11.75 3.75a6 6 0 118.49 8.49z" />
        <path d="M16 8 2 22" />
        <path d="M17.488 15H9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'feather',
  gesture: 'it drifts down',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['light', 'soft', 'quill', 'feather'],
}

export default FeatherIcon
