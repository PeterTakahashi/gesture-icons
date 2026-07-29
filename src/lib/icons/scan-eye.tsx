import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Scan eye — it locks onto its subject. The four corner brackets nudge
 * inward exactly as in scan.tsx (bracket lock), and the eye performs its
 * own verb — a blink, same language as eye.tsx — reading as the sensor
 * actually looking at what it has framed.
 * Base geometry: Lucide `scan-eye` (ISC).
 */
const DUR = 0.9
const NUDGE = { times: [0, 0.15, 0.5, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }

export function ScanEyeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan eye'}
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
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.1, 1, 0.96, 1],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.52, 0.68, 0.9],
              ease: [easeInCubic, easeOutQuart, easeInOutCubic, easeOutQuart],
            },
          },
        }}
      >
        <circle cx="12" cy="12" r="1" />
        <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scan-eye',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['find', 'scan', 'eye'],
}

export default ScanEyeIcon
