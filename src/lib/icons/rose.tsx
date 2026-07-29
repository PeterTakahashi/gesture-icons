import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Rose — VARIANT(flower-2): it blooms for you. The bloom (the folded petal
 * marks and the center) turns toward the light and takes a small proud
 * swell, hinged at the neck where the stem meets the head — the same
 * heliotropic turn as flower-2, plus the bloom scale this spec asks for.
 * The stem and the thorn-marked leaf stand still beneath it.
 * Base geometry: Lucide `rose` (ISC).
 */
const DUR = 0.9

export function RoseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rose'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9.77px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -7, 3, 0],
            scale: [1, 1.06, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M17 10h-1a4 4 0 1 1 4-4v.534" />
        <path d="M17 6h1a4 4 0 0 1 1.42 7.74l-2.29.87a6 6 0 0 1-5.339-10.68l2.069-1.31" />
        <circle cx="17" cy="8" r="2" />
      </motion.g>
      <path d="M4.5 17c2.8-.5 4.4 0 5.5.8s1.8 2.2 2.3 3.7c-2 .4-3.5.4-4.8-.3-1.2-.6-2.3-1.9-3-4.2" />
      <path d="M9.77 12C4 15 2 22 2 22" />
    </svg>
  )
}

export const meta = {
  name: 'rose',
  gesture: 'it blooms for you',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['flower', 'romance', 'love', 'rose'],
}

export default RoseIcon
