import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Folder lock — the folder is locked. VARIANT(lock), mini: the shackle
 * lifts clear, holds a beat, then drops with gravity and the lock body
 * takes the click on the contact frame. The folder holds still throughout.
 * Base geometry: Lucide `folder-lock` (ISC).
 */
const DUR = 0.9

export function FolderLockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder lock'}
      {...hoverProps}
    >
      <path d="M10 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v2.5" />
      <motion.path
        d="M20 17v-2a2 2 0 1 0-4 0v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, -2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        width="8" height="5" x="14" y="17" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.58, 0.74, 0.82, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-lock',
  gesture: 'the folder is locked',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['directory', 'secure'],
}

export default FolderLockIcon
