import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Salad — it is tossed. The bowl shakes once, decaying; the contents inside
 * lag ~4% behind (inertia arrives late) and take a small hop, as if the
 * greens briefly left the bowl before settling back with it.
 * Base geometry: Lucide `salad` (ISC).
 */
const DUR = 0.65

export function SaladIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'salad'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 3, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M7 21h10" />
        <path d="M12 21a9 9 0 0 0 9-9H3a9 9 0 0 0 9 9Z" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -3, 3, -1.5, 0],
            y: [0, -0.7, 0.2, 0, 0],
            transition: { duration: DUR, delay: DUR * 0.04, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M11.38 12a2.4 2.4 0 0 1-.4-4.77 2.4 2.4 0 0 1 3.2-2.77 2.4 2.4 0 0 1 3.47-.63 2.4 2.4 0 0 1 3.37 3.37 2.4 2.4 0 0 1-1.1 3.7 2.51 2.51 0 0 1 .03 1.1" />
        <path d="m13 12 4-4" />
        <path d="M10.9 7.25A3.99 3.99 0 0 0 4 10c0 .73.2 1.41.54 2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'salad',
  gesture: 'it is tossed',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['healthy', 'vegetables'],
}

export default SaladIcon
