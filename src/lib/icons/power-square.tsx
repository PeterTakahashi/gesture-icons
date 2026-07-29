import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Power square — VARIANT(power): the vertical stroke presses down like a
 * button and springs back, then the inner arc pulses once around its own
 * center — the beat of power.tsx, boot button first, then the light — while
 * the square frame breathes with it on the same clock.
 * Base geometry: Lucide `power-square` (ISC).
 */
const DUR = 0.85

export function PowerSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'power square'}
      {...hoverProps}
    >
      <motion.path
        d="M12 7v4"
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
        d="M7.998 9.003a5 5 0 1 0 8-.005"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
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
      <motion.rect
        x="3" y="3" width="18" height="18" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'power-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['frame', 'mark', 'power', 'square'],
}

export default PowerSquareIcon
