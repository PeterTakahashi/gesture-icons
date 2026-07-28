import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Rocket — it does a lap. It leaves past its own nose, up along the
 * diagonal the fuselage already points, is repositioned while genuinely
 * off-frame, and arrives back down that same line. Departure is the fast
 * third of the beat; the arrival gets the rest, same discipline as send.tsx.
 * Base geometry: Lucide `rocket` (ISC).
 */
const DUR = 1.15

export function RocketIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rocket'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            // 鼻先の斜め軸に沿って離陸 → 見えない間に反対側へ → 帰還
            x: [0, 10, 10, -10, -10, 0],
            y: [0, -10, -10, 10, 10, 0],
            transition: {
              duration: DUR,
              times: [0, 0.33, 0.42, 0.42, 0.46, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09" />
        <path d="M9 12a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.4 22.4 0 0 1-4 2z" />
        <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 .05 5 .05" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'rocket',
  gesture: 'it does a lap',
  family: 'travel' as const,
  section: 'Transport',
  tags: ['launch', 'start', 'ship', 'startup'],
}

export default RocketIcon
