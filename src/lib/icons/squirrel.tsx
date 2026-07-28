import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Squirrel — it startles. The whole glyph freezes, then darts left in one
 * fast beat — a tiny wind-up right, the drive left past the mark, a settle —
 * while the tail (the last thing inertia lets go of) trails 5% behind on the
 * same curve, and everything eases back cautiously slow.
 * Base geometry: Lucide `squirrel` (ISC).
 */
const DUR = 1.0

export function SquirrelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'squirrel'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.3, -1.8, -1.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.3, 0.36, 0.5, 0.58, 1],
              ease: ['linear', easeInOutCubic, easeInCubic, settleBack, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M18 13h.01" />
        <path d="M18 6a4 4 0 0 0-4 4 7 7 0 0 0-7 7c0-5 4-5 4-10.5a4.5 4.5 0 1 0-9 0 2.5 2.5 0 0 0 5 0C7 10 3 11 3 17c0 2.8 2.2 5 5 5h10" />
      </motion.g>
      {/* tail: the last thing inertia lets go of, 5% behind the body */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.3, -1.8, -1.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.33, 0.39, 0.53, 0.61, 1],
              ease: ['linear', easeInOutCubic, easeInCubic, settleBack, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M15.236 22a3 3 0 0 0-2.2-5" />
        <path d="M16 20a3 3 0 0 1 3-3h1a2 2 0 0 0 2-2v-2a4 4 0 0 0-4-4V4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'squirrel',
  gesture: 'it startles',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['animal', 'nuts'],
}

export default SquirrelIcon
