import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Target — the shot lands. The bullseye takes the hit: it compresses to
 * almost nothing and pops back past its size before settling. The rings
 * recoil outward from the impact, each one 3% later than the last — the
 * middle ring isn't hit by the shot, it's hit by the ring inside it.
 * Base geometry: Lucide `target` (ISC).
 */
const DUR = 0.9

export function TargetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'target'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.43, 0.61], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.circle
        cx="12" cy="12" r="6"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.23, 0.4, 0.58], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.circle
        cx="12" cy="12" r="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.5, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.45, 0.7], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'target',
  gesture: 'the shot lands',
  family: 'secondary' as const,
  section: 'Sport & games',
  tags: ['aim', 'goal', 'bullseye'],
}

export default TargetIcon
