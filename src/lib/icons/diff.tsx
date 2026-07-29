import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Diff — the boolean is part: the addition (the plus, top) and the removal
 * (the minus, bottom) actually separate a hair further apart for a beat —
 * the two sides of a diff pulling apart to be read — then settle back to
 * exactly the layout Lucide drew.
 * Base geometry: Lucide `diff` (ISC).
 */
const DUR = 0.9

export function DiffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'diff'}
      {...hoverProps}
    >
      {/* the addition */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 3v14" />
        <path d="M5 10h14" />
      </motion.g>
      {/* the removal */}
      <motion.path
        d="M5 21h14"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'diff',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'diff'],
}

export default DiffIcon
