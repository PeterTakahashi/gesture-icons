import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Stone — it skips once. The whole stone hops up and drifts forward, lands
 * with a gravity dip, and slides on a little before settling — pond
 * physics, one skip.
 * Base geometry: Lucide `stone` (ISC).
 */
const DUR = 0.9

export function StoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'stone'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 1, 2, 1.2, 0],
            y: [0, -3, 0, 0.3, 0],
            transition: {
              duration: DUR,
              x: { times: [0, 0.32, 0.58, 0.8, 1], ease: easeOutQuart },
              y: { times: [0, 0.32, 0.58, 0.76, 1], ease: [easeOutQuart, gravity, easeOutQuart, easeOutQuart] },
            },
          },
        }}
      >
        <path d="M11.264 2.205A4 4 0 0 0 6.42 4.211l-4 8a4 4 0 0 0 1.359 5.117l6 4a4 4 0 0 0 4.438 0l6-4a4 4 0 0 0 1.576-4.592l-2-6a4 4 0 0 0-2.53-2.53z" />
        <path d="M11.99 22 14 12l7.822 3.184" />
        <path d="M14 12 8.47 2.302" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'stone',
  gesture: 'it skips once',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['rock', 'zen', 'stone'],
}

export default StoneIcon
