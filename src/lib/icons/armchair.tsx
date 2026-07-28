import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Armchair — it takes your weight. The seat-and-arms shape is a single path
 * in this glyph, so cushion-dip and arm-flex are carried by that one part
 * together: it dips down and widens a touch, then settles back — sat in and
 * left. The backrest frame and the legs never move.
 * Base geometry: Lucide `armchair` (ISC).
 */
const DUR = 0.8

export function ArmchairIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'armchair'}
      {...hoverProps}
    >
      <path d="M19 9V6a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v3" />
      <motion.path
        d="M3 16a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
        style={{ transformBox: 'view-box', transformOrigin: '11px 13.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, scaleX: 1 },
          animate: {
            y: [0, 1.4, -0.3, 0],
            scaleX: [1, 1.03, 0.99, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.7, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <path d="M5 18v2" />
      <path d="M19 18v2" />
    </svg>
  )
}

export const meta = {
  name: 'armchair',
  gesture: 'it takes your weight',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['furniture', 'sit', 'comfort'],
}

export default ArmchairIcon
