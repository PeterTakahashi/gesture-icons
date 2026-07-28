import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Mountain snow — the peak glints. The snowcap line alone does one length
 * shimmer: it erases by a fifth, then a pen redraws it whole — sun catching
 * the summit for a beat. The mountain itself holds still throughout.
 * Base geometry: Lucide `mountain-snow` (ISC).
 */
const DUR = 1.0

export function MountainSnowIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mountain snow'}
      {...hoverProps}
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      <motion.path
        d="M4.14 15.08c2.62-1.57 5.24-1.43 7.86.42 2.74 1.94 5.49 2 8.23.19"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.8, 1],
            transition: { duration: DUR, times: [0, 0.45, 1], ease: [easeInCubic, pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mountain-snow',
  gesture: 'the peak glints',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['peak', 'winter', 'summit'],
}

export default MountainSnowIcon
