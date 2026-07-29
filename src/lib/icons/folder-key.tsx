import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Folder key — it does what it means. VARIANT(folder): the folder dips on
 * the frame the key settles; the key turns about its own bow past 90° and
 * back, the same grip-and-turn as `key.tsx`, scaled to the badge.
 * Base geometry: Lucide `folder-key` (ISC).
 */
const DUR = 1.0

export function FolderKeyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder key'}
      {...hoverProps}
    >
      <motion.path
        d="M13 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H20a2 2 0 0 1 2 2v1.36"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.75, 0.86, 0.93, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 70, 70, -4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.4, 0.58, 0.86, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.1], 'linear', easeInOutQuart, easeOutQuart],
            },
          },
        }}
      >
        <path d="M19 12v6" />
        <path d="M19 14h2" />
        <circle cx="19" cy="20" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'folder-key',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['folder', 'key'],
}

export default FolderKeyIcon
