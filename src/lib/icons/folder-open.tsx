import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Folder open — it shows its contents. Lucide draws the open folder as one
 * fused path (front flap and back pocket are the same outline), so there is
 * no independent front-panel shape to hinge open further in isolation; the
 * honest equivalent is the whole glyph tipping a few degrees about its
 * bottom-front edge, holding, and closing back — a peek inside.
 * Base geometry: Lucide `folder-open` (ISC).
 */
const DUR = 0.9

export function FolderOpenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder open'}
      {...hoverProps}
    >
      <motion.path
        d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"
        style={{ transformBox: 'view-box', transformOrigin: '11px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, -6, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.62, 0.9], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-open',
  gesture: 'it shows its contents',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['directory', 'browse'],
}

export default FolderOpenIcon
