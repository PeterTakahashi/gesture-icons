import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Hourglass — it flips. The whole glyph turns 180° about its center: a
 * small counter wind-up, the flip itself, a slight over-rotation, then a
 * settle. The hourglass is vertically symmetric, so a 180° turn renders the
 * identical picture Lucide drew — the discrete reset to rotate:0 at the end
 * of the gesture is invisible because 180° and 0° are the same pixels.
 * Base geometry: Lucide `hourglass` (ISC).
 */
const DUR = 1.1
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.1]

export function HourglassIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hourglass'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 186, 180],
            transition: { duration: DUR, times: [0, 0.15, 0.75, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <path d="M5 22h14" />
        <path d="M5 2h14" />
        <path d="M17 22v-4.172a2 2 0 0 0-.586-1.414L12 12l-4.414 4.414A2 2 0 0 0 7 17.828V22" />
        <path d="M7 2v4.172a2 2 0 0 0 .586 1.414L12 12l4.414-4.414A2 2 0 0 0 17 6.172V2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hourglass',
  gesture: 'it flips',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['time', 'wait', 'loading', 'sand'],
}

export default HourglassIcon
