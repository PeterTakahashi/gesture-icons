import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Indent increase — the arrow nudges in first, and the indented lines
 * follow a beat behind, stepping in together as one block.
 * Base geometry: Lucide `indent-increase` (ISC).
 */
const DUR = 0.8

export function IndentIncreaseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'indent increase'}
      {...hoverProps}
    >
      <motion.path
        d="m3 8 4 4-4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 2.7, 0],
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
            x: [0, -0.6, 2.7, 0],
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
  name: 'indent-increase',
  gesture: 'it steps in',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['tab', 'format'],
}

export default IndentIncreaseIcon
