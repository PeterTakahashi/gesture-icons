import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Heart plus — one more is added. VARIANT: the plus pops — dips to nothing
 * and overshoots back, the same beat as `user-plus.tsx` — while the heart
 * dips y+0.5 exactly on the frame the plus lands; the heart's own outline
 * never changes shape.
 * Base geometry: Lucide `heart-plus` (ISC).
 */
const DUR = 1.0

export function HeartPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heart plus'}
      {...hoverProps}
    >
      <motion.path
        d="m14.479 19.374-.971.939a2 2 0 0 1-3 .019L5 15c-1.5-1.5-3-3.2-3-5.5a5.5 5.5 0 0 1 9.591-3.676.56.56 0 0 0 .818 0A5.49 5.49 0 0 1 22 9.5a5.2 5.2 0 0 1-.219 1.49"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.85], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15 15h6" />
        <path d="M18 12v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'heart-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['add', 'new', 'heart', 'plus'],
}

export default HeartPlusIcon
