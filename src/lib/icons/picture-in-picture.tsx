import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Picture in picture — the small screen docks. It slides further into its
 * corner with a settleBack overshoot and holds there a beat — where it
 * belongs — then eases back out to the position Lucide drew it in, since
 * a gesture always finishes back on its resting frame. The big frame
 * never moves.
 * Base geometry: Lucide `picture-in-picture` (ISC).
 */
const DUR = 1.0

export function PictureInPictureIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'picture in picture'}
      {...hoverProps}
    >
      <path d="M2 10h6V4" />
      <path d="m2 4 6 6" />
      <path d="M21 10V7a2 2 0 0 0-2-2h-7" />
      <path d="M3 14v2a2 2 0 0 0 2 2h3" />
      <motion.rect
        x="12" y="14" width="10" height="7" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1.4, 1.1, 0],
            y: [0, 1.0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: [settleBack, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'picture-in-picture',
  gesture: 'the small screen docks',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['pip', 'video', 'overlay', 'picture'],
}

export default PictureInPictureIcon
