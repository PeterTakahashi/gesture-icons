import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Dam — it holds the water. The spillway ripples nudge through one after
 * another, top first — waves.tsx's cadence, borrowed for the downstream
 * side — while the wall and the calm reservoir marks upstream never move:
 * pressure passing, structure unmoved.
 * Base geometry: Lucide `dam` (ISC).
 */
const LINE_DUR = 0.7
const STEP = 0.09

export function DamIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const line = (delay: number) => ({
    normal: { x: 0 },
    animate: {
      x: [0, 2, 0],
      transition: { duration: LINE_DUR, delay, times: [0, 0.5, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dam'}
      {...hoverProps}
    >
      <motion.path
        d="M11 11.31c1.17.56 1.54 1.69 3.5 1.69 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        initial="normal" animate={controls} variants={line(0)}
      />
      <motion.path
        d="M11.75 18c.35.5 1.45 1 2.75 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"
        initial="normal" animate={controls} variants={line(STEP)}
      />
      <path d="M2 10h4" />
      <path d="M2 14h4" />
      <path d="M2 18h4" />
      <path d="M2 6h4" />
      <path d="M7 3a1 1 0 0 0-1 1v16a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1L10 4a1 1 0 0 0-1-1z" />
    </svg>
  )
}

export const meta = {
  name: 'dam',
  gesture: 'it holds the water',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['hydro', 'river', 'power', 'dam'],
}

export default DamIcon
