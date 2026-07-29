import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * File badge — it is certified. VARIANT(file-text): the page and its folded
 * corner hold still except for a small dip on the frame the badge settles;
 * the badge itself gives one firm press pulse about its own center, like a
 * seal being pressed down.
 * Base geometry: Lucide `file-badge` (ISC).
 */
const DUR = 1.0

export function FileBadgeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file badge'}
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
        <path d="M13 22h5a2 2 0 0 0 2-2V8a2.4 2.4 0 0 0-.706-1.706l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v3.3" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.85], ease: settleBack },
          },
        }}
      >
        <path d="m7.69 16.479 1.29 4.88a.5.5 0 0 1-.698.591l-1.843-.849a1 1 0 0 0-.879.001l-1.846.85a.5.5 0 0 1-.692-.593l1.29-4.88" />
        <circle cx="6" cy="14" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-badge',
  gesture: 'it is certified',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'badge'],
}

export default FileBadgeIcon
