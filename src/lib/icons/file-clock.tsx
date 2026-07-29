import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * File clock — a moment ticks by. VARIANT(file-text): the page holds still
 * except for a small dip on the frame the clock settles; only the hand
 * ticks forward about the clock's own center and comes back — the face
 * itself never moves.
 * Base geometry: Lucide `file-clock` (ISC).
 */
const DUR = 1.0

export function FileClockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file clock'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.85], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 22h2a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v2.85" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <circle cx="8" cy="16" r="6" />
      <motion.path
        d="M8 14v2.2l1.6 1"
        style={{ transformBox: 'view-box', transformOrigin: '8px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 20, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-clock',
  gesture: 'a moment ticks by',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'clock'],
}

export default FileClockIcon
