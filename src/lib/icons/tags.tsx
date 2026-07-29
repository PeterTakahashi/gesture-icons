import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Tags — the deck fans. The front tag nudges further along its point's own
 * diagonal while the back tag counter-nudges the other way, a beat later —
 * plurality shown by the pair shuffling once — then both settle back
 * exactly stacked as drawn.
 * Base geometry: Lucide `tags` (ISC).
 */
const DUR = 0.9

export function TagsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tags'}
      {...hoverProps}
    >
      {/* back tag counter-nudges up-left, a beat after the front */}
      <motion.path
        d="M2 7v6.172a2 2 0 0 0 .586 1.414l6.71 6.71a2.4 2.4 0 0 0 3.191.193"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.3, -0.57, 0],
            y: [0, 0.3, -0.57, 0],
            transition: { duration: DUR, delay: 0.06, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
      {/* front tag nudges further along its own point */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3, 1.06, 0],
            y: [0, -0.3, 1.06, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.56, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M13.172 2a2 2 0 0 1 1.414.586l6.71 6.71a2.4 2.4 0 0 1 0 3.408l-4.592 4.592a2.4 2.4 0 0 1-3.408 0l-6.71-6.71A2 2 0 0 1 6 9.172V3a1 1 0 0 1 1-1z" />
        <circle cx="10.5" cy="6.5" r=".5" fill={color === 'currentColor' ? 'currentColor' : color} />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tags',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['collection', 'stack', 'tags'],
}

export default TagsIcon
