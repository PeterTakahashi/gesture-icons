import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Folder pen — it does what it means. VARIANT(folder): the folder dips on
 * the frame the pen settles; the pen itself traces a loose scribble hinged
 * at its own nib — the same organic jotting move as `notebook-pen.tsx`.
 * Base geometry: Lucide `folder-pen` (ISC).
 */
const DUR = 0.9

export function FolderPenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder pen'}
      {...hoverProps}
    >
      <motion.path
        d="M2 11.5V5a2 2 0 0 1 2-2h3.9c.7 0 1.3.3 1.7.9l.8 1.2c.4.6 1 .9 1.7.9H20a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-9.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.68, 0.8, 0.9, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M11.378 13.626a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        style={{ transformBox: 'view-box', transformOrigin: '2.3px 19.7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0, rotate: 0 },
          animate: {
            x: [0, 1, -1, 0.6, -0.6, 0],
            y: [0, -0.6, 0.6, -0.4, 0.4, 0],
            rotate: [0, 3, -3, 2, -2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.38, 0.58, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-pen',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['folder', 'pen'],
}

export default FolderPenIcon
