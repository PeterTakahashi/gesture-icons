import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Divide circle — the ring frame breathes once while the ÷ inside performs
 * divide.tsx's own verb: the two dots nudge apart vertically and return, the
 * bar takes a slight press right as they reach their widest point.
 * Base geometry: Lucide `divide-circle` (ISC).
 */
const DUR = 0.9

export function DivideCircleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'divide circle'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeOutQuart },
          },
        }}
      />
      <motion.line
        x1="12" x2="12" y1="8" y2="8"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y1: 8, y2: 8 },
          animate: {
            y1: [8, 8.3, 6.5, 8],
            y2: [8, 8.3, 6.5, 8],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
      <motion.line
        x1="8" x2="16" y1="12" y2="12"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1, 0.75, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.55, 0.75, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.line
        x1="12" x2="12" y1="16" y2="16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y1: 16, y2: 16 },
          animate: {
            y1: [16, 15.7, 17.5, 16],
            y2: [16, 15.7, 17.5, 16],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'divide-circle',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['frame', 'mark', 'divide', 'circle'],
}

export default DivideCircleIcon
