import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Laptop — it tips open. Lucide draws the screen and base as one
 * continuous outline, so the honest move is to pivot that whole shape
 * about the hinge line at its bottom edge (~y=15.9): the base portion
 * barely displaces so close to the pivot, while the screen above it
 * visibly swings back. The separate front-lip line stays put.
 * Base geometry: Lucide `laptop` (ISC).
 */
const DUR = 1.0

export function LaptopIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'laptop'}
      {...hoverProps}
    >
      <motion.path
        d="M18 5a2 2 0 0 1 2 2v8.526a2 2 0 0 0 .212.897l1.068 2.127a1 1 0 0 1-.9 1.45H3.62a1 1 0 0 1-.9-1.45l1.068-2.127A2 2 0 0 0 4 15.526V7a2 2 0 0 1 2-2z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 15.9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, -8, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
      <path d="M20.054 15.987H3.946" />
    </svg>
  )
}

export const meta = {
  name: 'laptop',
  gesture: 'it opens for work',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['computer', 'notebook'],
}

export default LaptopIcon
