import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Send to back — depth swaps: the top-left square (the one being sent back)
 * recedes with a small settle-shrink, while the bottom-right square, now the
 * new front, pops forward — the mirror of bring-to-front.tsx's move. The
 * connecting overlap notches are structural and hold still.
 * Base geometry: Lucide `send-to-back` (ISC).
 */
const DUR = 0.9

export function SendToBackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'send to back'}
      {...hoverProps}
    >
      <motion.rect
        x="14" y="14" width="8" height="8" rx="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.95, 1.08, 1],
            transition: { duration: DUR, times: [0, 0.28, 0.6, 0.85], ease: settleBack },
          },
        }}
      />
      <motion.rect
        x="2" y="2" width="8" height="8" rx="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.9, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      />
      <path d="M7 14v1a2 2 0 0 0 2 2h1" />
      <path d="M14 7h1a2 2 0 0 1 2 2v1" />
    </svg>
  )
}

export const meta = {
  name: 'send-to-back',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['boolean', 'layers', 'combine', 'send', 'back'],
}

export default SendToBackIcon
