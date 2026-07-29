import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint, settleBack, easeOutQuart } from '../core/easings'

/**
 * Radiation — it emits. The trefoil is 3-fold symmetric, so a 120° turn
 * about its center is a free landing — visually identical to rest. A
 * small counter wind-up, then the turn, and the center dot pulses once
 * exactly on the landing frame.
 * Base geometry: Lucide `radiation` (ISC).
 */
const DUR = 1.0

export function RadiationIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'radiation'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 120],
            transition: { duration: DUR, times: [0, 0.18, 0.85], ease: [easeInOutCubic, easeOutQuint] },
          },
        }}
      >
        <path d="M14 15.4641a4 4 0 0 1-4 0L7.52786 19.74597 A 1 1 0 0 0 7.99303 21.16211 10 10 0 0 0 16.00697 21.16211 1 1 0 0 0 16.47214 19.74597z" />
        <path d="M16 12a4 4 0 0 0-2-3.464l2.472-4.282a1 1 0 0 1 1.46-.305 10 10 0 0 1 4.006 6.94A1 1 0 0 1 21 12z" />
        <path d="M8 12a4 4 0 0 1 2-3.464L7.528 4.254a1 1 0 0 0-1.46-.305 10 10 0 0 0-4.006 6.94A1 1 0 0 0 3 12z" />
      </motion.g>
      <motion.path
        d="M12 12h.01"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.8, 0.92, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'radiation',
  gesture: 'it emits',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['nuclear', 'hazard', 'radiation'],
}

export default RadiationIcon
