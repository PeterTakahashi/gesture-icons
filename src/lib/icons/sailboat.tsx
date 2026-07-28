import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Sailboat — it catches the wind. The sail fills, scaling out from the
 * mast it's rigged to, while the hull rocks about its waterline — a
 * decaying gust, underway. The mast is the one still axis everything
 * else moves around.
 * Base geometry: Lucide `sailboat` (ISC).
 */
const DUR = 1.3

export function SailboatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sailboat'}
      {...hoverProps}
    >
      <path d="M10 2v15" />
      <motion.path
        d="M7 22a4 4 0 0 1-4-4 1 1 0 0 1 1-1h16a1 1 0 0 1 1 1 4 4 0 0 1-4 4z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, -2, 1, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.45, 0.65, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M9.159 2.46a1 1 0 0 1 1.521-.193l9.977 8.98A1 1 0 0 1 20 13H4a1 1 0 0 1-.824-1.567z"
        style={{ transformBox: 'view-box', transformOrigin: '10px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 1.08, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'sailboat',
  gesture: 'it catches the wind',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['sail', 'sea', 'yacht'],
}

export default SailboatIcon
