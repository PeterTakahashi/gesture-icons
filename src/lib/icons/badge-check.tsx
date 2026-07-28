import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack } from '../core/easings'

/**
 * Badge check — it certifies. The badge gives one firm press pulse and the
 * check erases and pen-redraws, landing exactly on the frame where the
 * badge settles: sealed and signed in the same beat.
 * Base geometry: Lucide `badge-check` (ISC).
 */
const DUR = 1.0

export function BadgeCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'badge check'}
      {...hoverProps}
    >
      <motion.path
        d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"
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
  name: 'badge-check',
  gesture: 'it certifies',
  family: 'draw-on' as const,
  section: 'Security',
  tags: ['verified', 'official'],
}

export default BadgeCheckIcon
