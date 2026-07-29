import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, easeInOutCubic } from '../core/easings'

/**
 * Kanban square — it does what it means. VARIANT(kanban): the frame holds
 * still while the three columns inside settle into height one after the
 * other, left to right, 6% apart.
 * Base geometry: Lucide `kanban-square` (ISC).
 */
const DUR = 0.85
const COLUMNS = ['M8 7v7', 'M12 7v4', 'M16 7v9']

function settle(delay: number): Variants {
  return {
    normal: { y: 0 },
    animate: {
      y: [0, -1.3, 0.35, -0.1, 0],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.3, 0.56, 0.76, 1],
        ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic],
      },
    },
  }
}

export function KanbanSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'kanban square'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      {COLUMNS.map((d, i) => (
        <motion.path key={d} d={d} initial="normal" animate={controls} variants={settle(i * 0.055)} />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'kanban-square',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['table', 'data', 'board', 'kanban', 'square'],
}

export default KanbanSquareIcon
