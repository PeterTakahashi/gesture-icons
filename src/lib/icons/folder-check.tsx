import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * Folder check — the folder is verified. The check erases fast and the pen
 * redraws it stroke-order, the same beat as check.tsx; the folder takes a
 * small dip right as the tick lands.
 * Base geometry: Lucide `folder-check` (ISC).
 */
const DUR = 1.0

export function FolderCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder check'}
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
            transition: { duration: DUR, times: [0, 0.62, 0.76, 0.9, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      />
      <motion.path
        d="m9 13 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.76], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-check',
  gesture: 'the folder is verified',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['directory', 'done'],
}

export default FolderCheckIcon
