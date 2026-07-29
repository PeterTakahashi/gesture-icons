import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Flip vertical — the two mirrored halves swap emphasis about the axis: the
 * top bracket grows as the bottom shrinks, then they reverse, each scaling
 * about its own center. The dashed axis line holds still.
 * Base geometry: Lucide `flip-vertical` (ISC).
 */
const DUR = 1.0

export function FlipVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flip vertical'}
      {...hoverProps}
    >
      <motion.path
        d="M21 8V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v3"
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
        d="M21 16v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-3"
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
      <path d="M4 12H2" />
      <path d="M10 12H8" />
      <path d="M16 12h-2" />
      <path d="M22 12h-2" />
    </svg>
  )
}

export const meta = {
  name: 'flip-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['flip', 'mirror', 'transform', 'vertical'],
}

export default FlipVerticalIcon
