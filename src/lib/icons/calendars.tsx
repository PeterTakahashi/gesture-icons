import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Calendars — the deck fans once. The front calendar noses further
 * down-left along the stack's own offset direction, the back calendar
 * counter-noses up-right, showing the pile has depth, then both settle
 * back into the exact resting overlap.
 * Base geometry: Lucide `calendars` (ISC).
 */
const DUR = 0.9

export function CalendarsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendars'}
      {...hoverProps}
    >
      {/* back calendar counter-nudges 0.8 up-right */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.8, 0],
            y: [0, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 2v2" />
        <path d="M18 2v2" />
        <path d="M8 8h14" />
        <rect x="8" y="3" width="14" height="14" rx="2" />
      </motion.g>
      {/* front calendar nudges 1.5 down-left, the deeper end of the stack */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.5, 0],
            y: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M15.726 21.01A2 2 0 0 1 14 22H4a2 2 0 0 1-2-2V10a2 2 0 0 1 2-2" />
        <path d="M2 13h2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'calendars',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['collection', 'stack', 'calendars'],
}

export default CalendarsIcon
