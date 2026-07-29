import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Redo dot — one thing waits. The dot is the point of the icon, so it POPs —
 * squished to nothing and overshot back, settling on the exact glyph — while
 * the redo hook gives only a 3%-late micro-dip, a beat behind the dot rather
 * than the full turn redo.tsx performs.
 * Base geometry: Lucide `redo-dot` (ISC).
 */
const DUR = 0.9

export function RedoDotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'redo dot'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="17" r="1"
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.5, 0.78], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, -0.4, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.25, 0.48, 0.72], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M21 7v6h-6" />
        <path d="M3 17a9 9 0 0 1 9-9 9 9 0 0 1 6 2.3l3 2.7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'redo-dot',
  gesture: 'one thing waits',
  family: 'secondary' as const,
  section: 'Arrows',
  tags: ['indicator', 'unread', 'redo', 'dot'],
}

export default RedoDotIcon
