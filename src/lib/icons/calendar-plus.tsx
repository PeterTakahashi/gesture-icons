import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Calendar plus — a date is booked. VARIANT(calendar): the plus is part of
 * this glyph's true rest picture, so it pops the way user-plus.tsx's mark
 * does — a dip to near-zero and an overshoot back to size — while the
 * frame takes calendar.tsx's small dip as it lands.
 * Base geometry: Lucide `calendar-plus` (ISC).
 */
const DUR = 0.85

export function CalendarPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'calendar plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.78], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M21 12.598V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8.5" />
        <path d="M3 10h18" />
        <path d="M8 2v4" />
        <path d="M16 2v4" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.8], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M16 19h6" />
        <path d="M19 16v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'calendar-plus',
  gesture: 'a date is booked',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['schedule', 'new', 'event'],
}

export default CalendarPlusIcon
