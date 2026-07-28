import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Hard drive download — data comes down. A wind-up up, a drive down toward
 * the drive's mouth, a settle overshoot, then home — the standard NUDGE.
 * The drive's own LED answers with one hard blink right on the frame the
 * arrow bottoms out: receipt confirmed.
 * Base geometry: Lucide `hard-drive-download` (ISC).
 */
const DUR = 0.85

export function HardDriveDownloadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hard drive download'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.2, 2.6, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 2v8" />
        <path d="m16 6-4 4-4-4" />
      </motion.g>
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <path d="M10 18h.01" />
      <motion.path
        d="M6 18h.01"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 1],
            transition: { duration: DUR, times: [0, 0.58, 0.63, 0.7], ease: 'linear' },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'hard-drive-download',
  gesture: 'data comes down',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['save', 'backup', 'sync'],
}

export default HardDriveDownloadIcon
