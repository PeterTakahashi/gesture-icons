import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Clipboard list — the rows stagger-nudge: the top row shifts first, the
 * bottom row a beat later, as if a hand were checking them off top to
 * bottom, then both rows and the board settle back into place.
 * Base geometry: Lucide `clipboard-list` (ISC).
 */
const DUR = 0.95

export function ClipboardListIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const rowVariants = (delay: number): Variants => ({
    normal: { x: 0 },
    animate: {
      x: [0, -0.6, 1.4, 0],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard list'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.65, 0.82, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={rowVariants(0)}>
        <path d="M12 11h4" />
        <path d="M8 11h.01" />
      </motion.g>
      <motion.g initial="normal" animate={controls} variants={rowVariants(0.08)}>
        <path d="M12 16h4" />
        <path d="M8 16h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clipboard-list',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['clipboard', 'tasks', 'list'],
}

export default ClipboardListIcon
