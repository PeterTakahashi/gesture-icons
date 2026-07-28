import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Heart — it beats. Not a generic pulse: a lub-dub — two contractions,
 * the second stronger, then the long diastole back to rest.
 * Base geometry: Lucide `heart` (ISC).
 */
export function HeartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heart'}
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
            // lub … DUB …… settle
            scale: [1, 1.12, 1.02, 1.22, 0.99, 1],
            transition: {
              duration: 0.95,
              times: [0, 0.12, 0.26, 0.42, 0.62, 1],
              ease: [easeOutQuint, easeInOutCubic, easeOutQuint, easeInOutCubic, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'heart',
  gesture: 'it beats, lub-dub',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['like', 'love', 'favorite', 'health'],
}

export default HeartIcon
