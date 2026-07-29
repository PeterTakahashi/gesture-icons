import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, pen, settleBack } from '../core/easings'

/**
 * Workflow — it wires itself up. The top-left node survives; the connector
 * erases then pen-redraws down into the bottom-right node, which implodes
 * as the line drains past it and pops back as the pen arrives — the exact
 * dependency-order language of git-branch.tsx.
 * Base geometry: Lucide `workflow` (ISC).
 */
const DUR = 1.15

export function WorkflowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'workflow'}
      {...hoverProps}
    >
      {/* the source node survives — everything else is rewritten around it */}
      <rect width="8" height="8" x="3" y="3" rx="2" />
      <motion.path
        d="M7 11v4a2 2 0 0 0 2 2h4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.42, 0.9], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      <motion.rect
        width="8" height="8" x="13" y="13" rx="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            // implodes as the line drains past it; pops back once the pen returns
            scale: [1, 1, 0.001, 0.001, 1.25, 1],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.26, 0.66, 0.82, 0.95],
              ease: ['linear', easeInCubic, 'linear', settleBack, [0.25, 1, 0.5, 1]],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'workflow',
  gesture: 'it wires itself up',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['nodes', 'structure', 'workflow'],
}

export default WorkflowIcon
