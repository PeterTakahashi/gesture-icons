import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * File lock — the doc is sealed. VARIANT(lock): the little shackle lifts
 * clear, holds a beat open, then drops with gravity; the lock body takes the
 * hit exactly on the contact frame. The page and its folded corner hold
 * still throughout.
 * Base geometry: Lucide `file-lock` (ISC).
 */
const DUR = 1.0

export function FileLockIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file lock'}
      {...hoverProps}
    >
      <path d="M4 9.8V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2h-3" />
      <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      <motion.path
        d="M9 17v-2a2 2 0 0 0-4 0v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.6, -2.6, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeOutQuart, 'linear', gravity] },
          },
        }}
      />
      <motion.rect
        width="8" height="5" x="3" y="17" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 0.85, 1], ease: ['linear', 'linear', gravity, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-lock',
  gesture: 'the doc is sealed',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['document', 'private', 'secure'],
}

export default FileLockIcon
