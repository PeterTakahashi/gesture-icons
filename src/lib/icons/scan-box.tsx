import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Scan box — it locks onto the crate. The four corner brackets nudge inward
 * exactly as in scan.tsx (bracket lock), and the box accent gives one dip-
 * and-flash pulse on the frame the brackets snap shut — the object being
 * identified right as the scan completes.
 * Base geometry: Lucide `scan-box` (ISC).
 */
const DUR = 0.9
const NUDGE = { times: [0, 0.15, 0.5, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }

export function ScanBoxIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan box'}
      {...hoverProps}
    >
      <motion.path
        d="M17 3h2a2 2 0 012 2v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M21 17v2a2 2 0 01-2 2h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M3 7V5a2 2 0 012-2h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M7 21H5a2 2 0 01-2-2v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      {/* the box itself flashes identified right as the brackets lock */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12.6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.94, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.48, 0.68, 0.92], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 12v5.5" />
        <path d="M7.264 9.252 12 12l4.737-2.748" />
        <path d="M7.995 8.514A2 2 0 0 0 7 10.244v3.516a2 2 0 0 0 .996 1.73l3 1.74a2 2 0 0 0 2.008 0l3-1.74A2 2 0 0 0 17 13.76v-3.517a2 2 0 0 0-.995-1.73l-3-1.742a2 2 0 0 0-1.892-.064z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'scan-box',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['find', 'scan', 'box'],
}

export default ScanBoxIcon
