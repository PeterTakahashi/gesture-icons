import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Bow & arrow — it looses the arrow. The arrow draws back along its own
 * axis under tension (ease-in — a pull accelerates into the anchor), holds
 * at full draw, then releases forward off-frame at speed. It is
 * repositioned, genuinely off-screen, back behind the bow, and returns on
 * an equal-times ease-out — the same trick as send.tsx. The two limbs flex
 * a hair as the string is drawn and spring back the instant it looses.
 * Base geometry: Lucide `bow-arrow` (ISC).
 */
// axis unit vector along the arrow shaft, (9.707,14.293) -> (21,3): NE, 45°
const DUR = 1.15

export function BowArrowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bow and arrow'}
      {...hoverProps}
    >
      <motion.path
        d="M18.575 11.082a13 13 0 0 1 1.048 9.027 1.17 1.17 0 0 1-1.914.597L14 17"
        style={{ transformBox: 'view-box', transformOrigin: '14px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.34, 0.46, 0.7], ease: [easeInCubic, 'linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M7 10 3.29 6.29a1.17 1.17 0 0 1 .6-1.91 13 13 0 0 1 9.03 1.05"
        style={{ transformBox: 'view-box', transformOrigin: '7px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, -2, 1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.34, 0.46, 0.7], ease: [easeInCubic, 'linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M7 14a1.7 1.7 0 0 0-1.207.5l-2.646 2.646A.5.5 0 0 0 3.5 18H5a1 1 0 0 1 1 1v1.5a.5.5 0 0 0 .854.354L9.5 18.207A1.7 1.7 0 0 0 10 17v-2a1 1 0 0 0-1-1z" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            // draw back into tension, hold, loose off-frame, reposition
            // behind the bow while genuinely off-screen, return
            x: [0, -1.4, -1.4, 19.8, -19.8, 0],
            y: [0, 1.4, 1.4, -19.8, 19.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.22, 0.34, 0.5, 0.5, 1],
              ease: [easeInCubic, 'linear', easeInCubic, 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M9.707 14.293 21 3" />
        <path d="M17 3h4v4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bow-arrow',
  gesture: 'it looses the arrow',
  family: 'travel' as const,
  section: 'Sport & games',
  tags: ['archery', 'aim', 'shoot', 'bow', 'arrow'],
}

export default BowArrowIcon
