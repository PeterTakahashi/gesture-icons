import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Scan — it frames the target. The four corner brackets nudge inward
 * together — a small wind-up out, the framing squeeze in, then settle back
 * to the resting frame Lucide drew.
 * Base geometry: Lucide `scan` (ISC).
 */
const DUR = 0.9
const NUDGE = { times: [0, 0.15, 0.5, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }

export function ScanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan'}
      {...hoverProps}
    >
      <motion.path
        d="M3 7V5a2 2 0 0 1 2-2h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M17 3h2a2 2 0 0 1 2 2v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M7 21H5a2 2 0 0 1-2-2v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'scan',
  gesture: 'it frames the target',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['scanner', 'frame'],
}

export default ScanIcon
