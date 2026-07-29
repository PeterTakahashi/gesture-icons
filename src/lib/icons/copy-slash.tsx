import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Copy slash — the stacked copies fan once. The front sheet (the rect,
 * z-top) noses further down-right along the stack's own offset, the back
 * sheet counter-noses up-left, showing the pile has depth, then both settle
 * back to the exact resting overlap. The slash is the "can't copy" mark, not
 * part of the stack, so it holds still throughout.
 * Base geometry: Lucide `copy-slash` (ISC).
 */
const DUR = 0.9

export function CopySlashIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy slash'}
      {...hoverProps}
    >
      <line x1="12" x2="18" y1="18" y2="12" />
      {/* front sheet, the deeper end of the stack */}
      <motion.rect
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.5, 0],
            y: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      {/* back sheet, counter-nudges the other way */}
      <motion.path
        d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.8, 0],
            y: [0, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'copy-slash',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['collection', 'stack', 'copy', 'slash'],
}

export default CopySlashIcon
