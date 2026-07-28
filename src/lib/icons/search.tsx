import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Search — the lens scans. It sweeps up-left, across, and settles home,
 * tilting slightly into each pass the way a held magnifier does.
 * One continuous read; nothing fades, nothing spins.
 * Base geometry: Lucide `search` (ISC).
 */
export function SearchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'search'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, -2.6, 2.2, 0],
            y: [0, -2, 1.7, 0],
            rotate: [0, -7, 5, 0],
            transition: { duration: 1.05, times: [0, 0.3, 0.66, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.34-4.34" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'search',
  gesture: 'the lens scans',
  family: 'rigid' as const,
  section: 'Data',
  tags: ['find', 'magnifier', 'lookup', 'zoom'],
}

export default SearchIcon
