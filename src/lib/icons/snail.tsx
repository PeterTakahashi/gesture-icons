import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Snail — it inches on. The shell turns about its own center while the body
 * stretches lengthwise about the tail — the classic inchworm-style single
 * step of travel, drawn slow because nothing about a snail is fast.
 * Base geometry: Lucide `snail` (ISC).
 */
const DUR = 1.4

export function SnailIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'snail'}
      {...hoverProps}
    >
      {/* shell turns about its own center */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '10px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -1.5, 9.5, 8, 8, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.4, 0.5, 0.75, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M2 13a6 6 0 1 0 12 0 4 4 0 1 0-8 0 2 2 0 0 0 4 0" />
        <circle cx="10" cy="13" r="8" />
      </motion.g>
      {/* body stretches lengthwise about the tail — one inch of travel */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '2px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 1.06, 0.98, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M2 21h12c4.4 0 8-3.6 8-8V7a2 2 0 1 0-4 0v6" />
        <path d="M18 3 19.1 5.2" />
        <path d="M22 3 20.9 5.2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'snail',
  gesture: 'it inches on',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['slow', 'animal', 'garden'],
}

export default SnailIcon
