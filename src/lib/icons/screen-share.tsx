import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Screen share — the screen goes live. The arrow NUDGEs up and to the
 * right — a wind-up down-left, the drive out, a settle-back — while the
 * screen it leaves takes a subtle press on the same beat — shared. The
 * stand beneath never moves.
 * Base geometry: Lucide `screen-share` (ISC).
 */
const DUR = 0.9

export function ScreenShareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'screen share'}
      {...hoverProps}
    >
      <motion.path
        d="M13 3H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.97, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.44, 0.54, 0.66, 0.85], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="M8 21h8" />
      <path d="M12 17v4" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.4, 1.2, 0],
            y: [0, 0.4, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.46, 0.7], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      >
        <path d="m17 8 5-5" />
        <path d="M17 3h5v5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'screen-share',
  gesture: 'the screen goes live',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['present', 'meeting', 'share'],
}

export default ScreenShareIcon
