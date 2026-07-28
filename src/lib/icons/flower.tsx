import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, settleBack } from '../core/easings'

/**
 * Flower — it blooms wider. The eight inner marks (the vein lines and the
 * diagonal accents inside each petal) pulse outward from the flower's own
 * center, staggered 30ms apart with a settling overshoot — opening to the
 * sun a petal at a time. The petals and center hold still underneath.
 * Base geometry: Lucide `flower` (ISC).
 */
const DUR = 0.6
const MARKS = ['M12 7.5V9', 'M7.5 12H9', 'M16.5 12H15', 'M12 16.5V15', 'm8 8 1.88 1.88', 'M14.12 9.88 16 8', 'm8 16 1.88-1.88', 'M14.12 14.12 16 16']

export function FlowerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'flower'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M12 16.5A4.5 4.5 0 1 1 7.5 12 4.5 4.5 0 1 1 12 7.5a4.5 4.5 0 1 1 4.5 4.5 4.5 4.5 0 1 1-4.5 4.5" />
      {MARKS.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1.12, 1],
              transition: { duration: DUR, delay: i * 0.03, times: [0, 0.4, 1], ease: [settleBack, easeOutQuart] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'flower',
  gesture: 'it blooms wider',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['nature', 'spring', 'bloom'],
}

export default FlowerIcon
