import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Circle — it is perfectly round. One soft breath: the whole disc swells
 * about its own center and settles — the platonic pulse.
 * Base geometry: Lucide `circle` (ISC).
 */
const DUR = 0.8

export function CircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circle'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'circle',
  gesture: 'it is perfectly round',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'geometry'],
}

export default CircleIcon
