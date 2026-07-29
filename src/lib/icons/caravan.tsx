import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Caravan — it is hitched. The tow takes up the slack: the body tugs back
 * and forward about the wheel's contact point, rocking slightly, then
 * settles. The wheel itself never turns — it's the hitch pulling taut, not
 * the road rolling past.
 * Base geometry: Lucide `caravan` (ISC).
 */
const DUR = 0.85

export function CaravanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'caravan'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '8px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1.5, 0.8, 0],
            rotate: [0, 1.5, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.36, 0.68, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 19V9a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v8a2 2 0 0 0 2 2h2" />
        <path d="M2 9h3a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H2" />
        <path d="M22 17v1a1 1 0 0 1-1 1H10v-9a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v9" />
      </motion.g>
      <circle cx="8" cy="19" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'caravan',
  gesture: 'it is hitched',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['camping', 'trailer', 'travel', 'caravan'],
}

export default CaravanIcon
