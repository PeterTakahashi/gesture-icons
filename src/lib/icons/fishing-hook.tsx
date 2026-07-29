import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuint, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Fishing hook — it sets the hook. The whole rig — hook, line and swivel —
 * yanks up and rotates hard about the rod tip off at the top-right corner,
 * holds a beat while the catch fights, then eases back down with a sway —
 * something bit.
 * Base geometry: Lucide `fishing-hook` (ISC).
 */
const DUR = 0.9

export function FishingHookIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fishing hook'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '22px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, -8, 2, 0],
            y: [0, -2, -2, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 0.8, 1], ease: [easeOutQuint, 'linear', settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m17.586 11.414-5.93 5.93a1 1 0 0 1-8-8l3.137-3.137a.707.707 0 0 1 1.207.5V10" />
        <path d="M20.414 8.586 22 7" />
        <circle cx="19" cy="10" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'fishing-hook',
  gesture: 'it sets the hook',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['fishing', 'catch', 'hook'],
}

export default FishingHookIcon
