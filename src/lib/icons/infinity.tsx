import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Infinity — it goes around forever, once. The lemniscate erases then a
 * single continuous pen stroke retraces the whole loop.
 * Base geometry: Lucide `infinity` (ISC).
 */
const DUR = 1.2

export function InfinityIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'infinity'}
      {...hoverProps}
    >
      <motion.path
        d="M6 16c5 0 7-8 12-8a4 4 0 0 1 0 8c-5 0-7-8-12-8a4 4 0 1 0 0 8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.3, 0.9], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'infinity',
  gesture: 'it goes around forever once',
  family: 'draw-on' as const,
  section: 'Charts & math',
  tags: ['endless', 'loop', 'math'],
}

export default InfinityIcon
