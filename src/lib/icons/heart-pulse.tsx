import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuint, pen } from '../core/easings'

/**
 * Heart pulse — it beats on the monitor. VARIANT(heart): the same lub-dub
 * scale beat, while the vitals line inside erases and pen-redraws fast,
 * timed to land through the stronger DUB — the trace catching up to the
 * heartbeat, not a separate clock.
 * Base geometry: Lucide `heart-pulse` (ISC).
 */
const DUR = 0.95

export function HeartPulseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heart pulse'}
      {...hoverProps}
    >
      <motion.path
        d="M2 9.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5c0 2.29-1.5 4-3 5.5l-5.492 5.313a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.12, 1.02, 1.22, 0.99, 1],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.26, 0.42, 0.62, 1],
              ease: [easeOutQuint, easeInOutCubic, easeOutQuint, easeInOutCubic, easeInOutCubic],
            },
          },
        }}
      />
      <motion.path
        d="M3.22 13H9.5l.5-1 2 4.5 2-7 1.5 3.5h5.27"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 1, 0.001, 1, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.36, 0.48, 1], ease: ['linear', easeInCubic, pen, 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'heart-pulse',
  gesture: 'it beats on the monitor',
  family: 'draw-on' as const,
  section: 'Health',
  tags: ['health', 'cardio', 'vitals'],
}

export default HeartPulseIcon
