import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wand — it casts. The wand flicks about its grip end, and the sparkle
 * marks around it pulse staggered right at the flick's apex — a small
 * spell cast and done, every spark landing back at its own resting size.
 * Base geometry: Lucide `wand-2` (ISC).
 */
const DUR = 0.85
const SPARKLES = [
  { d: 'm14 7 3 3', delay: 0 },
  { d: 'M5 6v4', delay: 0.03 },
  { d: 'M19 14v4', delay: 0.06 },
  { d: 'M10 2v2', delay: 0.02 },
  { d: 'M7 8H3', delay: 0.05 },
  { d: 'M21 16h-4', delay: 0.08 },
  { d: 'M11 3H9', delay: 0.04 },
]

export function WandIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const pulse = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 1, 1.35, 1],
      transition: { duration: DUR, delay, times: [0, 0.42, 0.58, 0.85], ease: [settleBack, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wand'}
      {...hoverProps}
    >
      <motion.path
        d="m21.64 3.64-1.28-1.28a1.21 1.21 0 0 0-1.72 0L2.36 18.64a1.21 1.21 0 0 0 0 1.72l1.28 1.28a1.2 1.2 0 0 0 1.72 0L21.64 5.36a1.2 1.2 0 0 0 0-1.72"
        style={{ transformBox: 'view-box', transformOrigin: '3px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 4, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.52, 0.85], ease: easeInOutCubic },
          },
        }}
      />
      {SPARKLES.map((s) => (
        <motion.path
          key={s.d}
          d={s.d}
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={pulse(s.delay)}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'wand',
  gesture: 'it casts',
  family: 'secondary' as const,
  section: 'Tools',
  tags: ['magic', 'spell', 'effect'],
}

export default WandIcon
