import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Power — it powers on. The vertical stroke presses down like a button and
 * springs back, then the ring pulses once around its own center — the
 * beat of a device actually booting, button first, then the light.
 * Base geometry: Lucide `power` (ISC).
 */
const DUR = 0.85

export function PowerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'power'}
      {...hoverProps}
    >
      <motion.path
        d="M12 2v10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.56], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M18.4 6.6a9 9 0 1 1-12.77.04"
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.08, 1],
            transition: { duration: DUR, times: [0, 0.56, 0.76, 1], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'power',
  gesture: 'it powers on',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['on', 'start', 'boot'],
}

export default PowerIcon
