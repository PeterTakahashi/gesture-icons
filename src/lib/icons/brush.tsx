import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Brush — one painting sweep of the wrist about the bristle tip
 * (the far corner of the ferrule, ~21,6), with a little sideways drift
 * so the stroke reads as an arc, not a rotation in place.
 * Base geometry: Lucide `brush` (ISC).
 */
const DUR = 0.9

export function BrushIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'brush'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '21px 6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, -8, 6, 0],
            x: [0, -1.5, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m11 10 3 3" />
        <path d="M6.5 21A3.5 3.5 0 1 0 3 17.5a2.62 2.62 0 0 1-.708 1.792A1 1 0 0 0 3 21z" />
        <path d="M9.969 17.031 21.378 5.624a1 1 0 0 0-3.002-3.002L6.967 14.031" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'brush',
  gesture: 'it lays a stroke',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['paint', 'art'],
}

export default BrushIcon
