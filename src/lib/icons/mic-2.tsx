import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mic 2 — it leans in. This Lucide glyph is a full alternate handheld-mic
 * illustration (grip + capsule), not "mic" plus a literal "2" mark, so per
 * the template's menu the honest move is the base mic's own tilt beat
 * adapted to this geometry: the whole assembly winds back a touch then
 * leans toward the mouth about the point where the grip meets the hand,
 * settling back with a small overshoot.
 * Base geometry: Lucide `mic-2` (ISC).
 */
const DUR = 0.85

export function Mic2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mic 2'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, -8, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      >
        <path d="m11 7.601-5.994 8.19a1 1 0 0 0 .1 1.298l.817.818a1 1 0 0 0 1.314.087L15.09 12" />
        <path d="M16.5 21.174C15.5 20.5 14.372 20 13 20c-2.058 0-3.928 2.356-6 2-2.072-.356-2.775-3.369-1.5-4.5" />
        <circle cx="16" cy="7" r="5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'mic-2',
  gesture: 'it leans in',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['media', 'mic'],
}

export default Mic2Icon
