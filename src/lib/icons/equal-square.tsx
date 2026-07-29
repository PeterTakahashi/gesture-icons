import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Equal square — the frame breathes once while the = inside performs
 * equal.tsx's own verb: the two bars wind up apart a hair, converge toward
 * each other, hold at the balanced gap, then settle back to rest.
 * Base geometry: Lucide `equal-square` (ISC).
 */
const DUR = 1.0

export function EqualSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'equal square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
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
      <motion.path
        d="M7 10h10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -0.2, 0.8, 0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.42, 0.68, 1],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
      <motion.path
        d="M7 14h10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.2, -0.8, -0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.42, 0.68, 1],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'equal-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['frame', 'mark', 'equal', 'square'],
}

export default EqualSquareIcon
