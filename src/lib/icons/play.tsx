import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Play — it presses play. The triangle presses in on itself like a button
 * being pushed, then pops forward and overshoots as the tape starts
 * rolling, and settles back to its resting size and place.
 * Base geometry: Lucide `play` (ISC).
 */
const DUR = 0.8

export function PlayIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'play'}
      {...hoverProps}
    >
      <motion.path
        d="M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, x: 0 },
          animate: {
            scale: [1, 0.9, 1.08, 1],
            x: [0, 0, 1.8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'play',
  gesture: 'it presses play',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['media', 'start', 'video', 'music'],
}

export default PlayIcon
