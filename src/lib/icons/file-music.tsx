import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File music — the note sways. VARIANT(file-text) crossed with
 * `music.tsx`: the page holds still except a small dip on the frame the
 * note settles; the stem and head sway about the note head they hang from,
 * a decaying lilt, each swing smaller than the last.
 * Base geometry: Lucide `file-music` (ISC).
 */
const DUR = 1.0

export function FileMusicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file music'}
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
        <path d="M11.65 22H18a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v10.35" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 7, -3, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.74, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M8 20v-7l3 1.474" />
        <circle cx="6" cy="20" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-music',
  gesture: 'the note sways',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'music'],
}

export default FileMusicIcon
