import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Circle dot — it centers. The dot pops hard, the ring breathes the
 * opposite way at every beat — when the dot shrinks the ring swells and
 * back — so the whole glyph reads as locked on one still point, not two
 * things moving independently.
 * Base geometry: Lucide `circle-dot` (ISC).
 */
const DUR = 0.8

export function CircleDotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circle dot'}
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
            scale: [1, 1.05, 0.97, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.circle
        cx="12" cy="12" r="1"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'circle-dot',
  gesture: 'it centers',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['target', 'record'],
}

export default CircleDotIcon
