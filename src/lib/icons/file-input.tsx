import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * File input — content is fed in. VARIANT(file-text): the page holds still
 * except a small dip on the frame the arrow lands; the line-and-chevron
 * mark nudges rightward — into the page — wind-up first, then the drive,
 * then settles home.
 * Base geometry: Lucide `file-input` (ISC).
 */
const DUR = 1.0

export function FileInputIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file input'}
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
        <path d="M4 11V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-1" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M2 15h10" />
        <path d="m9 18 3-3-3-3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-input',
  gesture: 'content is fed in',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'input'],
}

export default FileInputIcon
