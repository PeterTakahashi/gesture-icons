import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * File key — it draws itself. VARIANT(file-text): the page holds still; the
 * key performs its own verb — it turns about its own bow, key.tsx's gesture,
 * scaled to a smaller accent — and the page takes a small dip right as the
 * turn peaks.
 * Base geometry: Lucide `file-key` (ISC).
 */
const DUR = 1.0

export function FileKeyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file key'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.64, 0.8, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        <path d="M9.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v4" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '4px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 75, 75, -4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.56, 0.82, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M4 12v6" />
        <path d="M4 14h2" />
        <circle cx="4" cy="20" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-key',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'key'],
}

export default FileKeyIcon
