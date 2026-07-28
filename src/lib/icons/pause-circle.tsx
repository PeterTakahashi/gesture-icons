import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pause circle — held, in a ring. VARIANT(pause): the two bars squeeze
 * toward each other and hold, exactly as the bare glyph does; the ring
 * stays put — it is the frame the pause happens inside, not the thing
 * pausing.
 * Base geometry: Lucide `pause-circle` (ISC).
 */
const DUR = 0.85

export function PauseCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const bar = (dir: 1 | -1): Variants => ({
    normal: { x: 0, scaleY: 1 },
    animate: {
      x: [0, 1.1 * dir, 1.1 * dir, 0],
      scaleY: [1, 0.94, 0.94, 1],
      transition: { duration: DUR, times: [0, 0.3, 0.6, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pause circle'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="10" x2="10" y1="15" y2="9"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(1)}
      />
      <motion.line
        x1="14" x2="14" y1="15" y2="9"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={bar(-1)}
      />
    </svg>
  )
}

export const meta = {
  name: 'pause-circle',
  gesture: 'held, in a ring',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['media', 'wait'],
}

export default PauseCircleIcon
