import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Fence — it stands the wind. Each picket leans about its own base, left to
 * right, each one 4% of the beat behind the last — one gust passing down
 * the line, not a synchronized shove. The rails stay put.
 * Base geometry: Lucide `fence` (ISC).
 */
const DUR = 0.9
const STEP = 0.04

export function FenceIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const picket = (delay: number) => ({
    normal: { rotate: 0 },
    animate: {
      rotate: [0, -2, 1, 0],
      transition: { duration: DUR, delay, times: [0, 0.32, 0.66, 1], ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fence'}
      {...hoverProps}
    >
      <motion.path
        d="M4 3 2 5v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"
        style={{ transformBox: 'view-box', transformOrigin: '3.5px 21px' }}
        initial="normal" animate={controls} variants={picket(0)}
      />
      <path d="M6 8h4" />
      <path d="M6 18h4" />
      <motion.path
        d="m12 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"
        style={{ transformBox: 'view-box', transformOrigin: '11.5px 21px' }}
        initial="normal" animate={controls} variants={picket(DUR * STEP)}
      />
      <path d="M14 8h4" />
      <path d="M14 18h4" />
      <motion.path
        d="m20 3-2 2v15c0 .6.4 1 1 1h2c.6 0 1-.4 1-1V5Z"
        style={{ transformBox: 'view-box', transformOrigin: '19.5px 21px' }}
        initial="normal" animate={controls} variants={picket(DUR * 2 * STEP)}
      />
    </svg>
  )
}

export const meta = {
  name: 'fence',
  gesture: 'it stands the wind',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['boundary', 'yard', 'fence'],
}

export default FenceIcon
