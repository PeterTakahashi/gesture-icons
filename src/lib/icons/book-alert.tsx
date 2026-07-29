import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Book alert — it needs attention. The ! mark blinks twice — a true binary
 * opacity step, never a fade, per `terminal.tsx` — then holds steady; the
 * book gives one small dip exactly on the first blink, a flinch at the
 * warning, and then holds still through the second.
 * Base geometry: Lucide `book-alert` (ISC).
 */
const DUR = 1.0

export function BookAlertIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'book alert'}
      {...hoverProps}
    >
      <motion.path
        d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H19a1 1 0 0 1 1 1v18a1 1 0 0 1-1 1H6.5a1 1 0 0 1 0-5H20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0, 0],
            transition: { duration: DUR, times: [0, 0.1, 0.16, 0.23, 1], ease: [easeInCubic, easeOutQuart, easeOutQuart, 'linear'] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.09, 0.1, 0.22, 0.23, 0.35, 0.36, 0.48, 0.49, 0.55],
              ease: 'linear',
            },
          },
        }}
      >
        <path d="M12 13h.01" />
        <path d="M12 6v3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'book-alert',
  gesture: 'it needs attention',
  family: 'secondary' as const,
  section: 'Files & time',
  tags: ['warning', 'attention', 'book', 'alert'],
}

export default BookAlertIcon
