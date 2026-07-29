import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Ribbon — it is worn with pride. The interior twist detail (the small
 * crossing marks at the top of the loop) takes a gentle scale breath, while
 * the ribbon's body — the loop's outer silhouette continuing straight into
 * both tails as one drawn stroke — sways a few degrees about the knot below
 * the loop, 3% later than the breath, like fabric settling on a lapel pin.
 * The outer silhouette and both tails are one continuous Lucide path, so the
 * sway moves them together rather than slicing that path in two.
 * Base geometry: Lucide `ribbon` (ISC).
 */
const DUR = 0.9

export function RibbonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ribbon'}
      {...hoverProps}
    >
      {/* interior twist marks: a small proud breath */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.42, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 11.22C11 9.997 10 9 10 8a2 2 0 0 1 4 0c0 1-.998 2.002-2.01 3.22" />
        <path d="M6.243 9.016a7 7 0 0 1 11.507-.009" />
      </motion.g>
      {/* body + tails, one continuous stroke: sways on the knot, 3% late */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, -3, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.36, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m12 18 2.57-3.5" />
        <path d="M9.35 14.53 12 11.22" />
        <path d="M9.35 14.53C7.728 12.246 6 10.221 6 7a6 5 0 0 1 12 0c-.005 3.22-1.778 5.235-3.43 7.5l3.557 4.527a1 1 0 0 1-.203 1.43l-1.894 1.36a1 1 0 0 1-1.384-.215L12 18l-2.679 3.593a1 1 0 0 1-1.39.213l-1.865-1.353a1 1 0 0 1-.203-1.422z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'ribbon',
  gesture: 'it is worn with pride',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['awareness', 'cause', 'support', 'ribbon'],
}

export default RibbonIcon
