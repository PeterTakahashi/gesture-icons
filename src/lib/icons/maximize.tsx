import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Maximize — it stretches open. Both corner marks NUDGE outward along their
 * own diagonal — a small wind-up inward, then a drive out past their mark,
 * settling back home — on the same clock, so the frame reads as expanding
 * from the middle rather than one corner leading the other.
 * Base geometry: Lucide `maximize-2` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const DRIVE = 2.2
const WIND = 0.6

export function MaximizeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'maximize'}
      {...hoverProps}
    >
      {/* top-right corner nudges outward along its diagonal */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, 0],
            y: [0, WIND * D, -DRIVE * D, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M15 3h6v6" />
        <path d="m21 3-7 7" />
      </motion.g>
      {/* bottom-left corner nudges outward along its diagonal */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, WIND * D, -DRIVE * D, 0],
            y: [0, -WIND * D, DRIVE * D, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m3 21 7-7" />
        <path d="M9 21H3v-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'maximize',
  gesture: 'it stretches open',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['fullscreen', 'expand'],
}

export default MaximizeIcon
