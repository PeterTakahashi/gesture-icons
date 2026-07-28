import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Indent decrease — mirror of indent-increase: the arrow leads left,
 * the lines follow a beat behind, stepping back out together.
 * Base geometry: Lucide `indent-decrease` (ISC).
 */
const DUR = 0.8

export function IndentDecreaseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'indent decrease'}
      {...hoverProps}
    >
      <motion.path
        d="m7 8-4 4 4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -2.7, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -2.7, 0],
            transition: { duration: DUR, delay: DUR * 0.05, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M21 5H11" />
        <path d="M21 12H11" />
        <path d="M21 19H11" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'indent-decrease',
  gesture: 'it steps back out',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['outdent', 'format'],
}

export default IndentDecreaseIcon
