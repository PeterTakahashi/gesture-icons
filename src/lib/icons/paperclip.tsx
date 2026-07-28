import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Paperclip — it clips on. A pinch about the clip's own bottom curve: it
 * turns to grab, squeezes tighter as it bites, and releases back to rest —
 * rotation and a small scale squeeze on the same beat, one motion.
 * Base geometry: Lucide `paperclip` (ISC).
 */
const DUR = 0.8

export function PaperclipIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'paperclip'}
      {...hoverProps}
    >
      <motion.path
        d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551"
        style={{ transformBox: 'view-box', transformOrigin: '9px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, scale: 1 },
          animate: {
            rotate: [0, -8, 4, 0],
            scale: [1, 1, 0.96, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'paperclip',
  gesture: 'it clips on',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['attach', 'attachment', 'clip'],
}

export default PaperclipIcon
