import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, pen } from '../core/easings'

/**
 * List checks — the boxes tick in sequence, top to bottom. Both checks
 * erase together first, then the pen rewrites the top one, and the
 * bottom one a beat after — the eye reads it as ticking down the list.
 * Lines hold still throughout.
 * Base geometry: Lucide `list-checks` (ISC).
 */
const DUR = 1.0

export function ListChecksIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list checks'}
      {...hoverProps}
    >
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <motion.path
        d="m3 7 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.72], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="m3 17 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.5, 0.88], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'list-checks',
  gesture: 'it ticks the boxes',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['todo', 'done'],
}

export default ListChecksIcon
