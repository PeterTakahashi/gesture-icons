import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * File digit — the number writes itself. VARIANT(file-text): the page holds
 * still except a small dip on the frame the digits finish; the "10" mark
 * un-draws instantly and a pen rewrites both strokes together, on one clock,
 * the way `file-text.tsx`'s lines rewrite themselves.
 * Base geometry: Lucide `file-digit` (ISC).
 */
const DUR = 1.0

const digit: Variants = {
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.001, 0.001, 1],
    transition: { duration: DUR, times: [0, 0.3, 0.46, 0.8], ease: [easeInCubic, 'linear', pen] },
  },
}

export function FileDigitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file digit'}
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
        <path d="M4 12V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.path d="M10 16h2v6" initial="normal" animate={controls} variants={digit} />
      <motion.path d="M10 22h4" initial="normal" animate={controls} variants={digit} />
      <motion.rect x="2" y="16" width="4" height="6" rx="2" initial="normal" animate={controls} variants={digit} />
    </svg>
  )
}

export const meta = {
  name: 'file-digit',
  gesture: 'the number writes itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'digit'],
}

export default FileDigitIcon
