import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Component — the structure draws itself. Each of the four rounded diamonds
 * erases then pen-redraws its own outline in dependency order, clockwise
 * from the north node, each popping into place the moment its own stroke
 * lands (git-branch.tsx language, no separate connector lines to draw here —
 * the nodes ARE the drawn shapes).
 * Base geometry: Lucide `component` (ISC).
 */
const DUR = 1.3

export function ComponentIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const draw = (start: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [start, start + 0.08, start + 0.14, start + 0.32],
        ease: [easeInCubic, 'linear', pen],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'component'}
      {...hoverProps}
    >
      {/* north */}
      <motion.path
        d="M8.916 4.674a1 1 0 0 0 0 1.414l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
        initial="normal" animate={controls} variants={draw(0)}
      />
      {/* east */}
      <motion.path
        d="M15.536 11.293a1 1 0 0 0 0 1.414l2.376 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414l-2.377-2.377a1 1 0 0 0-1.414 0z"
        initial="normal" animate={controls} variants={draw(0.1)}
      />
      {/* south */}
      <motion.path
        d="M8.916 17.912a1 1 0 0 0 0 1.415l2.377 2.376a1 1 0 0 0 1.414 0l2.377-2.376a1 1 0 0 0 0-1.415l-2.377-2.376a1 1 0 0 0-1.414 0z"
        initial="normal" animate={controls} variants={draw(0.2)}
      />
      {/* west */}
      <motion.path
        d="M2.297 11.293a1 1 0 0 0 0 1.414l2.377 2.377a1 1 0 0 0 1.414 0l2.377-2.377a1 1 0 0 0 0-1.414L6.088 8.916a1 1 0 0 0-1.414 0z"
        initial="normal" animate={controls} variants={draw(0.3)}
      />
    </svg>
  )
}

export const meta = {
  name: 'component',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['nodes', 'structure', 'component'],
}

export default ComponentIcon
