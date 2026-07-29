import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File image — the sun rises in the thumbnail. VARIANT(file-text) crossed
 * with `image.tsx`: the page holds still except a small dip on the frame
 * the sun settles; the little sun lifts and drops back while the mountain
 * line stays put, exactly as the bare image glyph does.
 * Base geometry: Lucide `file-image` (ISC).
 */
const DUR = 1.0

export function FileImageIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file image'}
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
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="m20 17-1.296-1.296a2.41 2.41 0 0 0-3.408 0L9 22" />
      </motion.g>
      <motion.circle
        cx="10" cy="12" r="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.8, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeOutQuart, easeInOutCubic, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-image',
  gesture: 'the sun rises in the thumbnail',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'image'],
}

export default FileImageIcon
