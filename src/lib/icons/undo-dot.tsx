import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Undo dot — one thing waits. The dot is the point of this glyph (an unread
 * marker riding the undo arrow), so it pops — dips to nothing and overshoots
 * back — while the hook underneath gives only a 3%-late micro-dip, an
 * impact propagating outward from the dot rather than a full swing of its
 * own.
 * Base geometry: Lucide `undo-dot` (ISC).
 */
const DUR = 0.9

export function UndoDotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'undo dot'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, -0.7, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.25, 0.5, 0.8], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M21 17a9 9 0 0 0-15-6.7L3 13" />
        <path d="M3 7v6h6" />
      </motion.g>
      <motion.circle
        cx="12" cy="17" r="1"
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'undo-dot',
  gesture: 'one thing waits',
  family: 'secondary' as const,
  section: 'Arrows',
  tags: ['indicator', 'unread', 'undo', 'dot'],
}

export default UndoDotIcon
