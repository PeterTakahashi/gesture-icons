import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Server off — it powers down. The slash across the rack erases fast then
 * pen-draws back on, while the one surviving LED hard-blinks out right as
 * the cut begins and stays dark through almost the whole gesture — it only
 * snaps back on the final frame, because that is the rack's resting
 * picture, not because the light came back.
 * Base geometry: Lucide `server-off` (ISC).
 */
const DUR = 1.0

export function ServerOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'server off'}
      {...hoverProps}
    >
      <path d="M7 2h13a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-5" />
      <path d="M10 10 2.5 2.5C2 2 2 2.5 2 5v3a2 2 0 0 0 2 2h6z" />
      <path d="M22 17v-1a2 2 0 0 0-2-2h-1" />
      <path d="M4 14a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16.5l1-.5.5.5-8-8H4z" />
      <motion.path
        d="M6 18h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.15, 0.88, 0.92], ease: 'linear' },
          },
        }}
      />
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.2, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'server-off',
  gesture: 'it powers down',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['offline', 'shutdown'],
}

export default ServerOffIcon
