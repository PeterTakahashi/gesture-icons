import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Tent — it is pitched. The canvas settles onto its ground line: a small
 * squash, a slight spread as the guy lines take the load, then it stands
 * taut. The ground line itself never moves — the tent settles onto it.
 * Base geometry: Lucide `tent` (ISC).
 */
const DUR = 0.8

export function TentIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tent'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1, scaleY: 1 },
          animate: {
            scaleY: [1, 0.97, 1.015, 1],
            scaleX: [1, 1, 1.02, 1],
            transition: { duration: DUR, times: [0, 0.32, 0.62, 1], ease: [easeInCubic, easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M3.5 21 14 3" />
        <path d="M20.5 21 10 3" />
        <path d="M15.5 21 12 15l-3.5 6" />
      </motion.g>
      <path d="M2 21h20" />
    </svg>
  )
}

export const meta = {
  name: 'tent',
  gesture: 'it is pitched',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['camping', 'outdoor'],
}

export default TentIcon
