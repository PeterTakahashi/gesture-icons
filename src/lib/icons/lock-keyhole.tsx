import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, gravity, settleBack } from '../core/easings'

/**
 * Lock keyhole — it seats the key. The keyhole dot presses first — a key
 * tried in the hole — then the whole lock takes a small settle dip, as if
 * the body just absorbed the try. Ends on Lucide's resting locked picture.
 * Base geometry: Lucide `lock-keyhole` (ISC).
 */
const DUR = 1.0

export function LockKeyholeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lock keyhole'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.9, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.75, 0.88, 1], ease: ['linear', gravity, settleBack, easeOutQuart] },
          },
        }}
      >
        <motion.circle
          cx="12" cy="16" r="1"
          style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 0.7, 1.2, 1],
              transition: { duration: DUR, times: [0, 0.18, 0.4, 0.6], ease: [easeInCubic, settleBack, easeOutQuart] },
            },
          }}
        />
        <rect x="3" y="10" width="18" height="12" rx="2" />
        <path d="M7 10V7a5 5 0 0 1 10 0v3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'lock-keyhole',
  gesture: 'it seats the key',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['secure', 'private'],
}

export default LockKeyholeIcon
