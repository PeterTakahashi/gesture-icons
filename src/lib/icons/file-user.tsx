import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File user — it draws itself. The page holds, dipping once on the accent
 * frame; the little reader bows — a small, dignified dip of head and
 * shoulders about their own base (user.tsx's bow), then straightens.
 * Base geometry: Lucide `file-user` (ISC).
 */
const DUR = 0.9

export function FileUserIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file user'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.6, 0.95], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 6, 6, 0],
            transition: { duration: 0.75, delay: 0.15, times: [0, 0.32, 0.7, 0.95], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M16 22a4 4 0 0 0-8 0" />
        <circle cx="12" cy="15" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-user',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'user'],
}

export default FileUserIcon
