import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Folders — the stack fans. The front folder nudges further toward the
 * viewer along the stack's own diagonal while the back folder counter-nudges
 * deeper away, a smaller amount — then both settle back to the exact
 * picture Lucide drew. Plurality shown by the deck shuffling once.
 * Base geometry: Lucide `folders` (ISC).
 */
const DUR = 0.95
const D = 0.7071

export function FoldersIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folders'}
      {...hoverProps}
    >
      {/* front folder (top-right) nudges further up-right */}
      <motion.path
        d="M20 5a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h2.5a1.5 1.5 0 0 1 1.2.6l.6.8a1.5 1.5 0 0 0 1.2.6z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.5 * D, 0],
            y: [0, -1.5 * D, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      {/* back folder (bottom-left) counter-nudges further down-left, less far */}
      <motion.path
        d="M3 8.268a2 2 0 0 0-1 1.738V19a2 2 0 0 0 2 2h11a2 2 0 0 0 1.732-1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.8 * D, 0],
            y: [0, 0.8 * D, 0],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'folders',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['collection', 'stack', 'folders'],
}

export default FoldersIcon
