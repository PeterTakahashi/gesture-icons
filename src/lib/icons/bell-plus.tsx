import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bell plus — a new alert channel. VARIANT(bell): the same decaying swing
 * about the hanging loop, scaled small, and once it settles the plus mark
 * pops — dips to nothing and overshoots back — a channel just added.
 * Base geometry: Lucide `bell-plus` (ISC).
 */
const DUR = 1.0

export function BellPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell plus'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 7, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.34, 0.5, 0.64, 0.8], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10.268 21a2 2 0 0 0 3.464 0" />
        <path d="M20.002 14.464a9 9 0 0 0 .738.863A1 1 0 0 1 20 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 8.75-5.332" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.55, 0.7, 0.85, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15 8h6" />
        <path d="M18 5v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bell-plus',
  gesture: 'a new alert channel',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['notification', 'add', 'subscribe'],
}

export default BellPlusIcon
