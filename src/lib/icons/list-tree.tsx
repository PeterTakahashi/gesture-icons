import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * List tree — it draws itself. The rows hold; the trunk and its branch
 * un-draw then pen-redraw top to bottom, the way a hand would sketch a
 * tree structure — trunk first, then the stub that reaches its row.
 * Base geometry: Lucide `list-tree` (ISC).
 */
const DUR = 0.9

export function ListTreeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list tree'}
      {...hoverProps}
    >
      <path d="M8 5h13" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <motion.path
        d="M3 5v12a2 2 0 0 0 2 2h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.46, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.path
        d="M3 10a2 2 0 0 0 2 2h3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, delay: 0.12, times: [0, 0.3, 0.46, 0.92], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'list-tree',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['list', 'tree'],
}

export default ListTreeIcon
