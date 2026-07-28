import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Mail check — the mail went through. The check erases and pen-redraws
 * (stroke order, never a fade), and the envelope takes a small dip right as
 * the tick lands — delivered.
 * Base geometry: Lucide `mail-check` (ISC).
 */
const DUR = 1.0

export function MailCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mail check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 1.2, -0.3, 0],
            transition: { duration: DUR, times: [0, 0.64, 0.76, 0.9, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M22 13V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h8" />
        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
      </motion.g>
      <motion.path
        d="m16 19 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.68], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mail-check',
  gesture: 'the mail went through',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['email', 'sent', 'delivered'],
}

export default MailCheckIcon
