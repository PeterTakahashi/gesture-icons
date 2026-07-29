import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Folder up — it urges upward. A wind-up down then a drive up past the
 * mark before it settles home, easing out to rest; the chevron head runs
 * slightly ahead of the shaft the whole beat (arrow-up.tsx's lead/lag).
 * The folder itself holds still.
 * Base geometry: Lucide `folder-up` (ISC).
 */
const DUR = 0.78

export function FolderUpIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder up'}
      {...hoverProps}
    >
      <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
      <motion.path
        d="M12 10v6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m9 13 3-3 3 3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1, -2.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-up',
  gesture: 'it urges upward',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['up', 'folder'],
}

export default FolderUpIcon
