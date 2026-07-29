import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Clipboard type — VARIANT(clipboard-check): the "T" is stamped down like a
 * keystroke landing (scale press, not a pen-draw — the family here is
 * rigid), and the board takes clipboard-check's soft dip exactly on the
 * frame the stamp lands.
 * Base geometry: Lucide `clipboard-type` (ISC).
 */
const DUR = 0.9

export function ClipboardTypeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard type'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.65, 0.85], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </motion.g>
      {/* the T stamps down like a keystroke landing */}
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.88, 1.14, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M9 12v-1h6v1" />
        <path d="M11 17h2" />
        <path d="M12 11v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clipboard-type',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['clipboard', 'tasks', 'type'],
}

export default ClipboardTypeIcon
