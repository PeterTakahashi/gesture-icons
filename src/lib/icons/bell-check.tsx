import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeInOutQuart, easeOutQuart, pen } from '../core/easings'

/**
 * Bell check — it is confirmed. The check erases then pen-redraws (never a
 * fade), and the bell body takes a small y dip exactly on the frame it
 * lands — the confirmation landing on the notification.
 * Base geometry: Lucide `bell-check` (ISC).
 */
const DUR = 1.0

export function BellCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.8, 0.88], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
        <path d="M16.8607 4.4824A6 6 0 0 0 6 8C6 12.499 4.589 13.956 3.262 15.326" />
        <path d="M3.262 15.326A1 1 0 0 0 4 17H20A1 1 0 0 0 20.74 15.327C20.209 14.779 19.665 14.218 19.203 13.454" />
      </motion.g>
      <motion.path
        d="m15 8 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.8], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bell-check',
  gesture: 'it is confirmed',
  family: 'draw-on' as const,
  section: 'Objects',
  tags: ['done', 'verified', 'bell', 'check'],
}

export default BellCheckIcon
