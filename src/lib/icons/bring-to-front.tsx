import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Bring to front — the top square pulses forward while the back square's
 * corners scale outward from the shared center (12,12) — receding a touch
 * further behind it in both directions at once — then both settle back to
 * the exact resting overlap.
 * Base geometry: Lucide `bring-to-front` (ISC).
 */
const DUR = 0.9

export function BringToFrontIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bring to front'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M4 10a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2" />
        <path d="M14 20a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2v-4a2 2 0 0 0-2-2" />
      </motion.g>
      <motion.rect
        x="8" y="8" width="8" height="8" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.28, 0.6, 0.85], ease: settleBack },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bring-to-front',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'bring', 'front'],
}

export default BringToFrontIcon
