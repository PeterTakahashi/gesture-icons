import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, settleBack } from '../core/easings'

/**
 * Star half — half the praise. VARIANT(star): the same gather-and-bloom
 * beat, scaled down (0.75→1.1 instead of star's 0.55→1.14) — and, because a
 * half star has no rotational symmetry to land on for free, it only rocks
 * [0, -8, 4, 0] instead of turning a full 72°.
 * Base geometry: Lucide `star-half` (ISC).
 */
const DUR = 0.85

export function StarHalfIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star half'}
      {...hoverProps}
    >
      <motion.path
        d="M12 18.338a2.1 2.1 0 0 0-.987.244L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.12 2.12 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.12 2.12 0 0 0 1.597-1.16l2.309-4.679A.53.53 0 0 1 12 2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.75, 1.1, 1],
            rotate: [0, -8, 4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.32, 0.68, 1],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'star-half',
  gesture: 'half the praise',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['rating', 'review'],
}

export default StarHalfIcon
