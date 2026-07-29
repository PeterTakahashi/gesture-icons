import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Sticky notes — the deck fans. The front note nudges further along the
 * stack's diagonal while the back note counter-nudges the other way, a
 * beat later — the pile shuffling once — then both settle back exactly
 * stacked as drawn.
 * Base geometry: Lucide `sticky-notes` (ISC).
 */
const DUR = 0.9

export function StickyNotesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sticky notes'}
      {...hoverProps}
    >
      {/* back note counter-nudges up-right, a beat after the front */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 0.57, 0],
            y: [0, 0.3, -0.57, 0],
            transition: { duration: DUR, delay: 0.06, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M8 4a2 2 0 0 1 2-2h6a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 22 8v6a2 2 0 0 1-2 2" />
        <path d="M16 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      {/* front note nudges down-left along the stack */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.4, -1.06, 0],
            y: [0, -0.4, 1.06, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 16 14v6a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2z" />
        <path d="M10 8v5a1 1 0 0 0 1 1h5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'sticky-notes',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['collection', 'stack', 'sticky', 'notes'],
}

export default StickyNotesIcon
