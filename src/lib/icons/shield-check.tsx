import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack } from '../core/easings'

/**
 * Shield check — it holds the line. The shield gives one firm brace — a
 * pulse with a small overshoot, like flexing against a push — and the
 * checkmark erases and redraws with a pen stroke, landing exactly on the
 * frame where the shield settles: protection confirmed.
 * Base geometry: Lucide `shield-check` (ISC).
 */
const DUR = 1.0

export function ShieldCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shield check'}
      {...hoverProps}
    >
      <motion.path
        d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.85], ease: settleBack },
          },
        }}
      />
      <motion.path
        d="m9 12 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.5, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'shield-check',
  gesture: 'it holds the line',
  family: 'draw-on' as const,
  section: 'People',
  tags: ['security', 'safe', 'protected', 'verified'],
}

export default ShieldCheckIcon
