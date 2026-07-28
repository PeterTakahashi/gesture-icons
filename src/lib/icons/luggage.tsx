import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Luggage — it rolls to the gate. Tilted back on its wheels with a small
 * wind-up, driven forward, then set upright at rest — the hinge sits on the
 * wheel line, where the case actually touches the ground.
 * Base geometry: Lucide `luggage` (ISC).
 */
const DUR = 0.9

export function LuggageIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'luggage'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1, 2.5, 2.5, 0],
            rotate: [0, -1, -4, -4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.42, 0.76, 1], ease: [easeInOutCubic, easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M6 20a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2" />
        <path d="M8 18V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v14" />
        <path d="M10 20h4" />
        <circle cx="16" cy="20" r="2" />
        <circle cx="8" cy="20" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'luggage',
  gesture: 'it rolls to the gate',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['travel', 'suitcase', 'trip'],
}

export default LuggageIcon
