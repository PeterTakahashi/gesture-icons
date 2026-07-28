import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Folder plus — a folder is made. VARIANT(folder): the plus pops (dips to
 * nothing, overshoots, settles) about the center of its own cross, and the
 * folder dips a hair on the frame the plus lands.
 * Base geometry: Lucide `folder-plus` (ISC).
 */
const DUR = 0.95

export function FolderPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder plus'}
      {...hoverProps}
    >
      <motion.path
        d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.78, 1], ease: ['linear', 'linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.8], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M12 10v6" />
        <path d="M9 13h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'folder-plus',
  gesture: 'a folder is made',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['directory', 'new', 'create'],
}

export default FolderPlusIcon
