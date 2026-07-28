import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Orbit — the moon comes around. The satellite at (19,5) sits almost
 * exactly on the ring passing near it, roughly 9.9 units out from the
 * center (12,12); rotating it about that shared pivot is the honest way to
 * keep it riding its own ring rather than faking an arc with loose x/y
 * keyframes. A wind-up, a swing out to 90° with a small overshoot, a hold,
 * and an ease back home — half a transit and back.
 * Base geometry: Lucide `orbit` (ISC).
 */
const DUR = 1.3

export function OrbitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'orbit'}
      {...hoverProps}
    >
      <path d="M20.341 6.484A10 10 0 0 1 10.266 21.85" />
      <path d="M3.659 17.516A10 10 0 0 1 13.74 2.152" />
      <circle cx="12" cy="12" r="3" />
      <circle cx="5" cy="19" r="2" />
      <motion.circle
        cx="19" cy="5" r="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 96, 90, 90, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.42, 0.5, 0.62, 1],
              ease: [easeInOutCubic, easeOutQuint, easeOutQuart, 'linear', easeOutQuart],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'orbit',
  gesture: 'the moon comes around',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['space', 'cycle', 'satellite'],
}

export default OrbitIcon
