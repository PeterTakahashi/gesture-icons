import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Clipboard clock — the hands lap the face once, a full 360° sweep about
 * the dial's own center that lands back on the exact reading it started at
 * (0° ≡ 360°, a free landing), while the board underneath takes its
 * familiar soft dip right after.
 * Base geometry: Lucide `clipboard-clock` (ISC).
 */
const DUR = 1.1

export function ClipboardClockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard clock'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.7, 0],
            transition: { duration: DUR, times: [0, 0.82, 0.9, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M16 4h2a2 2 0 0 1 2 2v.832" />
        <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h2" />
        <rect x="8" y="2" width="8" height="4" rx="1" />
      </motion.g>
      <circle cx="16" cy="16" r="6" />
      <motion.path
        d="M16 14v2.2l1.6 1"
        style={{ transformBox: 'view-box', transformOrigin: '16px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR * 0.75, ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clipboard-clock',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['clipboard', 'tasks', 'clock'],
}

export default ClipboardClockIcon
