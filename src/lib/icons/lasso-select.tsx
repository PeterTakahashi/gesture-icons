import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Lasso select — it makes its move. VARIANT(lasso): the loop holds still
 * while its drag handle NUDGEs outward and settles back, same language as
 * lasso.tsx; the cursor riding along with the selection gets its own small
 * click-nudge down-right on the same clock — two handles, one gesture.
 * Base geometry: Lucide `lasso-select` (ISC).
 */
const DUR = 0.8
const UX = -0.55
const UY = 0.83
const WIND = 0.4
const DRIVE = 1.5
const D = 0.7071
const CLICK_DRIVE = 0.8

export function LassoSelectIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lasso select'}
      {...hoverProps}
    >
      <path d="M3.34 14A6.8 6.8 0 0 1 2 10c0-4.42 4.48-8 10-8s10 3.58 10 8a7.19 7.19 0 0 1-.33 2" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * UX, DRIVE * UX, 0],
            y: [0, -WIND * UY, DRIVE * UY, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M7 22a5 5 0 0 1-2-4" />
        <path d="M7 16.93c.96.43 1.96.74 2.99.91" />
        <path d="M5 18a2 2 0 1 0 0-4 2 2 0 0 0 0 4z" />
      </motion.g>
      <motion.path
        d="M14.33 22h-.09a.35.35 0 0 1-.24-.32v-10a.34.34 0 0 1 .33-.34c.08 0 .15.03.21.08l7.34 6a.33.33 0 0 1-.21.59h-4.49l-2.57 3.85a.35.35 0 0 1-.28.14z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.3 * D, CLICK_DRIVE * D, CLICK_DRIVE * D, 0],
            y: [0, -0.3 * D, CLICK_DRIVE * D, CLICK_DRIVE * D, 0],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.36, 0.55, 0.9],
              ease: [easeInOutCubic, 'linear', 'linear', settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'lasso-select',
  gesture: 'it makes its move',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'lasso'],
}

export default LassoSelectIcon
