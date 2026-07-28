import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Scan face — it recognizes you. The four corner brackets nudge inward
 * together — a small wind-up out, then the lock-on drive in — while the
 * face marks give a tiny pop right as the brackets close. Both settle back
 * to Lucide's resting frame.
 * Base geometry: Lucide `scan-face` (ISC).
 */
const DUR = 1.0
const NUDGE = { times: [0, 0.15, 0.5, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }

export function ScanFaceIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan face'}
      {...hoverProps}
    >
      <motion.path
        d="M3 7V5a2 2 0 0 1 2-2h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.3, 1.2, 0], y: [0, -0.3, 1.2, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M17 3h2a2 2 0 0 1 2 2v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.3, -1.2, 0], y: [0, -0.3, 1.2, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.3, -1.2, 0], y: [0, 0.3, -1.2, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M7 21H5a2 2 0 0 1-2-2v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.3, 1.2, 0], y: [0, 0.3, -1.2, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      {/* the face: a tiny pop right as the brackets lock on */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 11.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.2, 1],
            transition: { duration: DUR, times: [0, 0.42, 0.58, 0.8], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M8 14s1.5 2 4 2 4-2 4-2" />
        <path d="M9 9h.01" />
        <path d="M15 9h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scan-face',
  gesture: 'it recognizes you',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['biometric', 'face', 'id'],
}

export default ScanFaceIcon
