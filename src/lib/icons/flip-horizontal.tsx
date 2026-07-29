import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Flip horizontal — the two mirrored halves swap emphasis about the axis:
 * the left bracket grows as the right shrinks, then they reverse, each
 * scaling about its own center — a flip considered, not committed. The
 * dashed axis line holds still.
 * Base geometry: Lucide `flip-horizontal` (ISC).
 */
const DUR = 1.0

export function FlipHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flip horizontal'}
      {...hoverProps}
    >
      <motion.path
        d="M8 3H5a2 2 0 0 0-2 2v14c0 1.1.9 2 2 2h3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1, 0.94, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M16 3h3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.94, 1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M12 20v2" />
      <path d="M12 14v2" />
      <path d="M12 8v2" />
      <path d="M12 2v2" />
    </svg>
  )
}

export const meta = {
  name: 'flip-horizontal',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['flip', 'mirror', 'transform', 'horizontal'],
}

export default FlipHorizontalIcon
