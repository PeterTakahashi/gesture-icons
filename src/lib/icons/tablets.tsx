import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tablets — the dose is counted. Each tablet presses in turn, 90ms apart —
 * counted out one at a time, not both at once.
 * Base geometry: Lucide `tablets` (ISC).
 */
const DUR = 0.7

export function TabletsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = (delay: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.85, 1.1, 1],
      transition: { duration: DUR, delay, times: [0, 0.2, 0.45, 0.7], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tablets'}
      {...hoverProps}
    >
      <motion.circle
        cx="7" cy="7" r="5"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={press(0)}
      />
      <motion.circle
        cx="17" cy="17" r="5"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={press(0.09)}
      />
      <path d="M12 17h10" />
      <path d="m3.46 10.54 7.08-7.08" />
    </svg>
  )
}

export const meta = {
  name: 'tablets',
  gesture: 'the dose is counted',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['medicine', 'pills'],
}

export default TabletsIcon
