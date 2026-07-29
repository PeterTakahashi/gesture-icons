import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Folder dot — one thing waits. VARIANT: the dot is the point of the icon,
 * so it carries the gesture — it pops to nothing and overshoots back,
 * per spec numbers; the folder answers with a 3%-late micro-dip, small
 * enough to read as a reaction, not the main event.
 * Base geometry: Lucide `folder-dot` (ISC).
 */
const DUR = 0.9

export function FolderDotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder dot'}
      {...hoverProps}
    >
      <motion.path
        d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, -0.1, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.32, 0.5, 0.68, 0.9], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.circle
        cx="12" cy="13" r="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.28, 0.6, 0.88], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folder-dot',
  gesture: 'one thing waits',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['indicator', 'unread', 'folder', 'dot'],
}

export default FolderDotIcon
