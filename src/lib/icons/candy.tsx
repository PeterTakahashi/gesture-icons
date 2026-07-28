import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Candy — it twists open. The two wrapper ends turn opposite ways about
 * the points where they meet the body and spring back — almost opened, not
 * quite. The body and its twist-crease lines never move; only the two
 * loose ends carry the verb.
 * Base geometry: Lucide `candy` (ISC).
 */
const DUR = 0.9

export function CandyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'candy'}
      {...hoverProps}
    >
      <path d="M10 7v10.9" />
      <path d="M14 6.1V17" />
      <motion.path
        d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4"
        style={{ transformBox: 'view-box', transformOrigin: '16px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 11, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="M16.536 7.465a5 5 0 0 0-7.072 0l-2 2a5 5 0 0 0 0 7.07 5 5 0 0 0 7.072 0l2-2a5 5 0 0 0 0-7.07" />
      <motion.path
        d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4"
        style={{ transformBox: 'view-box', transformOrigin: '8px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2, -11, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'candy',
  gesture: 'it twists open',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['sweet', 'treat'],
}

export default CandyIcon
