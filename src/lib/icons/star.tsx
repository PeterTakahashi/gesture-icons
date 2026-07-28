import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint } from '../core/easings'

/**
 * Star — it gathers itself and blooms back.
 * The turn is free: a five-point star is 5-fold symmetric, so it blooms
 * through 72° and lands on a picture identical to rest — a rotation this
 * big is only allowed because it costs nothing to leave.
 * Base geometry: Lucide `star` (ISC).
 */
export function StarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'star'}
      {...hoverProps}
    >
      <motion.path
        d="M11.525 2.295a.53.53 0 0 1 .95 0l2.31 4.679a2.123 2.123 0 0 0 1.595 1.16l5.166.756a.53.53 0 0 1 .294.904l-3.736 3.638a2.123 2.123 0 0 0-.611 1.878l.882 5.14a.53.53 0 0 1-.771.56l-4.618-2.428a2.122 2.122 0 0 0-1.973 0L6.396 21.01a.53.53 0 0 1-.77-.56l.881-5.139a2.122 2.122 0 0 0-.611-1.879L2.16 9.795a.53.53 0 0 1 .294-.906l5.165-.755a2.122 2.122 0 0 0 1.597-1.16z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            // 集まる（ease-in：内へ向かうものは加速する）→ 咲く → 落ち着く
            scale: [1, 0.55, 1.14, 1],
            rotate: [0, -22, 50, 72],
            transition: {
              duration: 0.9,
              times: [0, 0.3, 0.66, 1],
              ease: [[0.55, 0, 0.7, 0.3], easeOutQuint, [0.34, 1.3, 0.64, 1]],
            },
          },
        }}
      />
    </svg>
  )
}
