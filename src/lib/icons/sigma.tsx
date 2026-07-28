import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Sigma — it sums up. The source path already runs top to bottom, so the
 * summation erases and a single pen stroke writes it back on, unchanged.
 * Base geometry: Lucide `sigma` (ISC).
 */
const DUR = 1.05

export function SigmaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sigma'}
      {...hoverProps}
    >
      <motion.path
        d="M18 7V5a1 1 0 0 0-1-1H6.5a.5.5 0 0 0-.4.8l4.5 6a2 2 0 0 1 0 2.4l-4.5 6a.5.5 0 0 0 .4.8H17a1 1 0 0 0 1-1v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.32, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'sigma',
  gesture: 'it sums up',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['sum', 'math', 'total'],
}

export default SigmaIcon
