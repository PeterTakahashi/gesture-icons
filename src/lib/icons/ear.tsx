import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Ear — it listens closely. It leans in about the lobe, a hair bigger while
 * it strains to catch the words, holds through the listening beat, and
 * returns upright — say that again?
 * Base geometry: Lucide `ear` (ISC).
 */
const DUR = 0.9

export function EarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ear'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, 4, 4, 0],
            scale: [1, 1.04, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M6 8.5a6.5 6.5 0 1 1 13 0c0 6-6 6-6 10a3.5 3.5 0 1 1-7 0" />
        <path d="M15 8.5a2.5 2.5 0 0 0-5 0v1a2 2 0 1 1 0 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ear',
  gesture: 'it listens closely',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['hear', 'sound', 'listen', 'ear'],
}

export default EarIcon
