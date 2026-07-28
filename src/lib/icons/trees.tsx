import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Trees — the wood murmurs. Both canopies sway about the tops of their own
 * trunks, the right tree's sway phase-shifted 6% behind the left's — wind
 * moving through two trees a beat apart. Both trunks stand still.
 * Base geometry: Lucide `trees` (ISC).
 */
const DUR = 1.2

export function TreesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'trees'}
      {...hoverProps}
    >
      <motion.path
        d="M10 10v.2A3 3 0 0 1 8.9 16H5a3 3 0 0 1-1-5.8V10a3 3 0 0 1 6 0Z"
        style={{ transformBox: 'view-box', transformOrigin: '7px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      />
      <path d="M7 16v6" />
      <path d="M13 19v3" />
      <motion.path
        d="M12 19h8.3a1 1 0 0 0 .7-1.7L18 14h.3a1 1 0 0 0 .7-1.7L16 9h.2a1 1 0 0 0 .8-1.7L13 3l-1.4 1.5"
        style={{ transformBox: 'view-box', transformOrigin: '13px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 3, 0],
            transition: { duration: DUR, times: [0, 0.41, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'trees',
  gesture: 'the wood murmurs',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['forest', 'nature'],
}

export default TreesIcon
