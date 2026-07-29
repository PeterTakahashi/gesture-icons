import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, easeInOutCubic } from '../core/easings'

/**
 * Kanban — it does what it means. The three columns hang from the same top
 * edge, so "cards taking their places" reads as each column settling into
 * height a beat after the last, left to right, 6% apart — a small lift and
 * a soft landing, never all three at once.
 * Base geometry: Lucide `kanban` (ISC).
 */
const DUR = 0.85
const COLUMNS = ['M5 3v14', 'M12 3v8', 'M19 3v18']

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

export function KanbanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'kanban'}
      {...hoverProps}
    >
      {COLUMNS.map((d, i) => (
        <motion.path key={d} d={d} initial="normal" animate={controls} variants={settle(i * 0.055)} />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'kanban',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['table', 'data', 'board', 'kanban'],
}

export default KanbanIcon
