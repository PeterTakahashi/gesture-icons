import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Signpost — it points the ways. Lucide draws the two arrow boards as one
 * fused board shape (not two independent signs), so the honest reading of
 * "each rotate opposite, 6% apart" is a single board that wobbles first one
 * way, then the other, decaying to rest — considering both directions before
 * settling. The post never moves.
 * Base geometry: Lucide `signpost` (ISC).
 */
const DUR = 1.0

export function SignpostIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'signpost'}
      {...hoverProps}
    >
      <path d="M12 13v8" />
      <path d="M12 3v3" />
      {/* the boards: considering one way, then the other, decaying to rest */}
      <motion.path
        d="M2.354 10.354a1.207 1.207 0 0 1 0-1.708l2.06-2.06A2 2 0 0 1 5.828 6h12.344a2 2 0 0 1 1.414.586l2.06 2.06a1.207 1.207 0 0 1 0 1.708l-2.06 2.06a2 2 0 0 1-1.414.586H5.828a2 2 0 0 1-1.414-.586z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 9.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 5, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.56, 0.78, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'signpost',
  gesture: 'it points the ways',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['directions', 'choice'],
}

export default SignpostIcon
