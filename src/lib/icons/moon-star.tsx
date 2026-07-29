import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Moon star — it drifts asleep. The moon leans into its slow tilt and
 * holds at its furthest lean before straightening (moon.tsx's nod), while
 * the little star sparkles — stretching out along its own cross axis and
 * back — right as the moon settles into its lean.
 * Base geometry: Lucide `moon-star` (ISC).
 */
const DUR = 1.1

export function MoonStarIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'moon star'}
      {...hoverProps}
    >
      <motion.path
        d="M20.985 12.486a9 9 0 1 1-9.473-9.472c.405-.022.617.46.402.803a6 6 0 0 0 8.268 8.268c.344-.215.825-.004.803.401"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, -14, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.6, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '20px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.4, 1],
            transition: { duration: 0.7, delay: 0.25, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M18 5h4" />
        <path d="M20 3v4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'moon-star',
  gesture: 'it drifts asleep',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['weather', 'moon', 'star'],
}

export default MoonStarIcon
