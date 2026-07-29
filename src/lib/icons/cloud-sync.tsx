import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Cloud sync — it completes one sync pass. In Lucide's source the top sync
 * arc is drawn as the same continuous path as the cloud's own dome (they
 * share a stroke), so the two can't be pulled apart without inventing new
 * geometry — the honest move is one small turn of the whole glyph, the way
 * a dial gives a click when a sync finishes, rather than isolating an arrow
 * that isn't actually a separate shape. The two arrowheads (which *are*
 * independent marks) each give a small confirming pop right as the turn
 * settles.
 * Base geometry: Lucide `cloud-sync` (ISC).
 */
const DUR = 1.0

export function CloudSyncIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud sync'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 10, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.85], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      >
        <path d="m17 18-1.535 1.605a5 5 0 0 1-8-1.5" />
        <motion.path
          d="M17 22v-4h-4"
          style={{ transformBox: 'view-box', transformOrigin: '15px 20px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.25, 1],
              transition: { duration: DUR, times: [0, 0.45, 0.6, 0.85], ease: ['linear', settleBack, easeOutQuart] },
            },
          }}
        />
        <path d="M20.996 15.251A4.5 4.5 0 0 0 17.495 8h-1.79a7 7 0 1 0-12.709 5.607" />
        <motion.path
          d="M7 10v4h4"
          style={{ transformBox: 'view-box', transformOrigin: '9px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.25, 1],
              transition: { duration: DUR, delay: 0.05, times: [0, 0.45, 0.6, 0.85], ease: ['linear', settleBack, easeOutQuart] },
            },
          }}
        />
        <path d="m7 14 1.535-1.605a5 5 0 0 1 8 1.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cloud-sync',
  gesture: 'it completes one sync pass',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'cloud', 'sync'],
}

export default CloudSyncIcon
