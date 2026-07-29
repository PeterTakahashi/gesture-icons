import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Save all — the stacked copies fan. The front disk nudges along the
 * stack's own diagonal (down-right) while the back sheet counter-nudges the
 * other way at a smaller amplitude, then both home — plurality shown by
 * the deck shuffling once, on one clock.
 * Base geometry: Lucide `save-all` (ISC).
 */
const DUR = 0.9

export function SaveAllIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'save all'}
      {...hoverProps}
    >
      {/* the back sheet counter-nudges up-left, a smaller amplitude */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.5, -0.8, 0],
            y: [0, 0.5, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.58, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M18 22H4a2 2 0 0 1-2-2V6" />
        <path d="M8 18a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9.172a2 2 0 0 1 1.414.586l2.828 2.828A2 2 0 0 1 22 6.828V16a2 2 0 0 1-2.01 2z" />
      </motion.g>
      {/* the front item nudges down-right along the stack direction */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.7, 1.5, 0],
            y: [0, -0.7, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.58, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M10 2v3a1 1 0 0 0 1 1h5" />
        <path d="M18 18v-6a1 1 0 0 0-1-1h-6a1 1 0 0 0-1 1v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'save-all',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['collection', 'stack', 'save', 'all'],
}

export default SaveAllIcon
