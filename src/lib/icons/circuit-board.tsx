import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Circuit board — the traces light in sequence, a power-on self test. Each
 * trace erases into the node it is anchored to and pen-redraws away from
 * it, one after the other, never together. The top trace starts at node 1's
 * own edge, so its pop marks the signal leaving that node; the bottom trace
 * runs the other way (from the board's edge to node 2's edge), so its pop
 * marks true arrival — the honest reading each path's own direction gives.
 * Base geometry: Lucide `circuit-board` (ISC).
 */
const DUR = 1.1

export function CircuitBoardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const trace = (start: number, hold: number, end: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, start, hold, end], ease: [easeInCubic, 'linear', pen] },
    },
  })
  const node = (start: number, arrive: number, pop: number, settle: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 0.001, 0.001, 1.3, 1],
      transition: {
        duration: DUR,
        times: [0, start * 0.5, start, arrive, pop, settle],
        ease: ['linear', easeInCubic, 'linear', settleBack, easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circuit board'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.path d="M11 9h4a2 2 0 0 0 2-2V3" initial="normal" animate={controls} variants={trace(0.12, 0.16, 0.48)} />
      <motion.circle
        cx="9" cy="9" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls}
        variants={node(0.16, 0.16, 0.24, 0.32)}
      />
      <motion.path d="M7 21v-4a2 2 0 0 1 2-2h4" initial="normal" animate={controls} variants={trace(0.5, 0.56, 0.92)} />
      <motion.circle
        cx="15" cy="15" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal" animate={controls}
        variants={node(0.56, 0.92, 0.97, 1)}
      />
    </svg>
  )
}

export const meta = {
  name: 'circuit-board',
  gesture: 'the traces light',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['hardware', 'pcb', 'electronics'],
}

export default CircuitBoardIcon
