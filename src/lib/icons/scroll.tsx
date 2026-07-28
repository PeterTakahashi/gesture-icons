import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Scroll — it unrolls a little. Both rolled ends live inside the one
 * compound path (left roll near (4,5), right roll near (8,19)), so a single
 * small rotation about the axis between them — (6,12) — swings each end in
 * the opposite sense relative to the other, reading as the two ends
 * counter-rotating even though it is one rigid rotation. The whole body
 * stretches a hair at the same time, as if a few lines were read and
 * re-rolled.
 * Base geometry: Lucide `scroll` (ISC).
 */
const DUR = 1.0

export function ScrollIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scroll'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M19 17V5a2 2 0 0 0-2-2H4" />
        <motion.path
          d="M8 21h12a2 2 0 0 0 2-2v-1a1 1 0 0 0-1-1H11a1 1 0 0 0-1 1v1a2 2 0 1 1-4 0V5a2 2 0 1 0-4 0v2a1 1 0 0 0 1 1h3"
          style={{ transformBox: 'view-box', transformOrigin: '6px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -6, 6, -2, 0],
              transition: { duration: DUR, times: [0, 0.32, 0.62, 0.82, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scroll',
  gesture: 'it unrolls a little',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'ancient', 'script'],
}

export default ScrollIcon
