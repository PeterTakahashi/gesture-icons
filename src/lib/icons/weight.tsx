import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Weight — it is hefted. VARIANT(dumbbell): the same slow, effortful lift,
 * a strained hold at the top, then a controlled heavy landing dip — one
 * swing, not a bounce.
 * Base geometry: Lucide `weight` (ISC).
 */
const DUR = 1.3

export function WeightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'weight'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2, -2, 0.8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.35, 0.6, 0.8, 1],
              ease: [easeInOutCubic, 'linear', easeInCubic, easeOutQuart],
            },
          },
        }}
      >
        <circle cx="12" cy="5" r="3" />
        <path d="M6.5 8a2 2 0 0 0-1.905 1.46L2.1 18.5A2 2 0 0 0 4 21h16a2 2 0 0 0 1.925-2.54L19.4 9.5A2 2 0 0 0 17.48 8Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'weight',
  gesture: 'it is hefted',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['kettlebell', 'gym', 'heavy', 'weight'],
}

export default WeightIcon
