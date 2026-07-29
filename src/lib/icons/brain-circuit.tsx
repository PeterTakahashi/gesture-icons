import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Brain circuit — a thought routes through. The brain takes one soft pulse
 * first, then each circuit trace erases and pen-redraws outward from it,
 * staggered; the node at the end of each trace gives a small settle-back
 * bounce the instant the line arrives, never before.
 * Base geometry: Lucide `brain-circuit` (ISC).
 */
const DUR = 0.75
const LINES: { d: string; node: readonly [number, number]; delay: number }[] = [
  { d: 'M12 13h4', node: [16, 13], delay: 0.15 },
  { d: 'M12 8h8', node: [20, 8], delay: 0.22 },
  { d: 'M12 18h6a2 2 0 0 1 2 2v1', node: [20, 21], delay: 0.29 },
  { d: 'M16 8V5a2 2 0 0 1 2-2', node: [18, 3], delay: 0.36 },
]

function traceVariants(delay: number): Variants {
  return {
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1, 1],
      transition: { duration: DUR, delay, times: [0, 0.22, 0.3, 0.75, 1], ease: [easeInCubic, 'linear', pen] },
    },
  }
}
function nodeVariants(delay: number): Variants {
  return {
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 1.3, 1],
      transition: { duration: DUR, delay, times: [0, 0.75, 0.88, 1], ease: ['linear', settleBack, easeOutQuart] },
    },
  }
}

export function BrainCircuitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'brain circuit'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.5], ease: easeOutQuart },
          },
        }}
      >
        <path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z" />
        <path d="M9 13a4.5 4.5 0 0 0 3-4" />
        <path d="M6.003 5.125A3 3 0 0 0 6.401 6.5" />
        <path d="M3.477 10.896a4 4 0 0 1 .585-.396" />
        <path d="M6 18a4 4 0 0 1-1.967-.516" />
      </motion.g>
      {LINES.map((l) => (
        <motion.path key={l.d} d={l.d} initial="normal" animate={controls} variants={traceVariants(l.delay)} />
      ))}
      {LINES.map((l) => (
        <motion.circle
          key={`${l.node[0]}-${l.node[1]}`}
          cx={l.node[0]} cy={l.node[1]} r=".5"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={nodeVariants(l.delay)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'brain-circuit',
  gesture: 'a thought routes through',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['ai', 'neural', 'mind', 'brain', 'circuit'],
}

export default BrainCircuitIcon
