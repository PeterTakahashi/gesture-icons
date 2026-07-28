import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Scan line — the beam passes. Only the middle line moves: one sweep down
 * to the bottom of the frame and back up past the top, landing exactly back
 * on Lucide's centered line. The brackets never move — they are the frame
 * the beam scans inside of.
 * Base geometry: Lucide `scan-line` (ISC).
 */
const DUR = 1.0

export function ScanLineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan line'}
      {...hoverProps}
    >
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <motion.path
        d="M7 12h10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -4, 4, 0],
            transition: { duration: DUR, times: [0, 0.38, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'scan-line',
  gesture: 'the beam passes',
  family: 'secondary' as const,
  section: 'Security',
  tags: ['scanner', 'barcode'],
}

export default ScanLineIcon
