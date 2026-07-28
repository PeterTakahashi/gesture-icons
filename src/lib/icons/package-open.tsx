import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { settleBack, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Package open — it is unpacked. The two flaps swing open on the fold lines
 * where they meet the box, hold a beat, then fold back down; the box itself
 * takes a small dip the instant the flaps land closed again — the thump of
 * cardboard settling, not one frame before contact.
 * Base geometry: Lucide `package-open` (ISC).
 */
const DUR = 1.2

export function PackageOpenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'package open'}
      {...hoverProps}
    >
      {/* the box: dips only on the frame the flaps land */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0, 0.8, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.7, 0.85, 0.92, 0.98, 1], ease: ['linear', 'linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 22v-9" />
        <path d="M20 13v3.87a2.06 2.06 0 0 1-1.11 1.83l-6 3.08a1.93 1.93 0 0 1-1.78 0l-6-3.08A2.06 2.06 0 0 1 4 16.87V13" />
      </motion.g>
      {/* flap A: hinges on the edge nearest the box, near (5.9, 13.6) */}
      <motion.path
        d="M15.17 2.21a1.67 1.67 0 0 1 1.63 0L21 4.57a1.93 1.93 0 0 1 0 3.36L8.82 14.79a1.655 1.655 0 0 1-1.64 0L3 12.43a1.93 1.93 0 0 1 0-3.36z"
        style={{ transformBox: 'view-box', transformOrigin: '5.9px 13.6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, -14, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 0.92], ease: [settleBack, 'linear', easeInOutCubic] },
          },
        }}
      />
      {/* flap B: mirrored, hinges near (18, 12) */}
      <motion.path
        d="M21 12.43a1.93 1.93 0 0 0 0-3.36L8.83 2.2a1.64 1.64 0 0 0-1.63 0L3 4.57a1.93 1.93 0 0 0 0 3.36l12.18 6.86a1.636 1.636 0 0 0 1.63 0z"
        style={{ transformBox: 'view-box', transformOrigin: '18px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 14, 14, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 0.92], ease: [settleBack, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'package-open',
  gesture: 'it is unpacked',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['box', 'unbox', 'delivery'],
}

export default PackageOpenIcon
