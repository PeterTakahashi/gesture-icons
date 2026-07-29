import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Blender — it pulses once. Only the jar shakes, hinged where it seats on
 * the base — one fast pulse on high, decaying to a stop. The base and its
 * button never move; that's what stays planted on the counter.
 * Base geometry: Lucide `blender` (ISC).
 */
const DUR = 0.5

export function BlenderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'blender'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -1.5, 1.5, -1.2, 1, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m17 2-1 12" />
        <path d="M8.006 14 7 2" />
        <path d="M7.565 8.787A5 5 0 0 0 12 8a5 5 0 0 1 4.56-.75" />
        <path d="M19 2H5a2 2 0 0 0-2 2v5a2 2 0 0 0 .688 1.5" />
      </motion.g>
      <path d="M8 14a2 2 0 0 0-1.963 1.615l-1.018 5.193A1 1 0 0 0 6 22h12a1 1 0 0 0 .981-1.192l-1.018-5.193A2 2 0 0 0 16 14z" />
      <path d="M12 18h.01" />
    </svg>
  )
}

export const meta = {
  name: 'blender',
  gesture: 'it pulses once',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['kitchen', 'mix', 'blender'],
}

export default BlenderIcon
