import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Server crash — it goes down hard. The whole rack (both units and the
 * crack running through them) takes a fast, decaying jolt, while the two
 * activity LEDs hard-blink out together — a true binary cut, never a fade —
 * and stay dark through the outage before both snap back on: recovered,
 * barely.
 * Base geometry: Lucide `server-crash` (ISC).
 */
const DUR = 1.0

export function ServerCrashIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const led = {
    normal: { opacity: 1 },
    animate: {
      opacity: [1, 1, 0, 0, 1, 1],
      transition: { duration: DUR, times: [0, 0.05, 0.06, 0.72, 0.78, 1], ease: 'linear' as const },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'server crash'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -1.5, 1.5, -1, 0.6, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.06, 0.14, 0.22, 0.3, 0.38, 0.46], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M6 10H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2" />
        <path d="M6 14H4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2h-2" />
        <path d="m13 6-4 6h6l-4 6" />
      </motion.g>
      <motion.path d="M6 6h.01" initial="normal" animate={controls} variants={led} />
      <motion.path d="M6 18h.01" initial="normal" animate={controls} variants={led} />
    </svg>
  )
}

export const meta = {
  name: 'server-crash',
  gesture: 'it goes down hard',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['outage', 'error', 'down'],
}

export default ServerCrashIcon
