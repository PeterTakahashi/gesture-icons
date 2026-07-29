import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * View — the frame opens for a look. The top and bottom brackets NUDGE
 * apart along their own edge: a small wind-up inward, a drive outward past
 * the mark, settleBack home — one clock, so the frame reads as widening
 * for a moment rather than one edge leading the other. The eye inside
 * holds still; it is what is being framed, not the frame.
 * Base geometry: Lucide `view` (ISC).
 */
const DUR = 0.75
const WIND = 0.5
const DRIVE = 1.6

export function ViewIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'view'}
      {...hoverProps}
    >
      {/* bottom bracket nudges further down */}
      <motion.path
        d="M21 17v2a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -WIND, DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
      {/* top bracket nudges further up */}
      <motion.path
        d="M21 7V5a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, WIND, -DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
      <circle cx="12" cy="12" r="1" />
      <path d="M18.944 12.33a1 1 0 0 0 0-.66 7.5 7.5 0 0 0-13.888 0 1 1 0 0 0 0 .66 7.5 7.5 0 0 0 13.888 0" />
    </svg>
  )
}

export const meta = {
  name: 'view',
  gesture: 'the frame opens for a look',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['frame', 'select', 'view'],
}

export default ViewIcon
