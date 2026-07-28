import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bell dot — one notification waits. VARIANT(bell): the same decaying swing
 * about the hanging loop, scaled down since there is only one thing to
 * announce, while the unread dot pops once on the first swing — that one
 * unread — and settles back to Lucide's resting badge.
 * Base geometry: Lucide `bell-dot` (ISC).
 */
const DUR = 0.95

export function BellDotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bell dot'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 7, -4, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.54, 0.7, 0.86, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M11.68 2.009A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673c-.824-.85-1.678-1.731-2.21-3.348" />
        <motion.path
          d="M10.268 21a2 2 0 0 0 3.464 0"
          style={{ transformBox: 'view-box', transformOrigin: '12px 17.5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 6, -5, 3, -2, 1, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.4, 0.58, 0.74, 0.88, 1], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
      {/* the unread dot: pops once, right on the bell's first swing */}
      <motion.circle
        cx="18" cy="5" r="3"
        style={{ transformBox: 'view-box', transformOrigin: '18px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.14, 0.3], ease: [settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bell-dot',
  gesture: 'one notification waits',
  family: 'secondary' as const,
  section: 'Security',
  tags: ['notification', 'unread'],
}

export default BellDotIcon
