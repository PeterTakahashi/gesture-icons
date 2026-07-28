import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Bell off — notifications sleep. The slash erases and pen-redraws across
 * the bell while it gives one tiny, defeated swing about the hanging
 * loop — silenced.
 * Base geometry: Lucide `bell-off` (ISC).
 */
const DUR = 1.0

export function BellOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
        <path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" />
        <path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.78], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bell-off',
  gesture: 'notifications sleep',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['mute', 'silent', 'dnd'],
}

export default BellOffIcon
