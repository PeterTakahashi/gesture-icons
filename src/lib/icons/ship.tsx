import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Ship — it rides the swell. A wave passes under the hull: the mast and
 * hull rock and bob together on one clock, decaying to rest, hinged at the
 * hull's own bottom center. The wave lines under the water hold still —
 * they are the water's resting picture, not the boat's.
 * Base geometry: Lucide `ship` (ISC).
 */
const DUR = 1.3

export function ShipIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ship'}
      {...hoverProps}
    >
      {/* hull bottom center — the swell's fulcrum */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -5, 4, -2.5, 1, 0],
            y: [0, -1, 0.6, -0.3, 0.15, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.42, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 10.189V14" />
        <path d="M12 2v3" />
        <path d="M19 13V7a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v6" />
        <path d="M19.38 20A11.6 11.6 0 0 0 21 14l-8.188-3.639a2 2 0 0 0-1.624 0L3 14a11.6 11.6 0 0 0 2.81 7.76" />
      </motion.g>
      {/* the water's own resting picture — never moves */}
      <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1s1.2 1 2.5 1c2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
    </svg>
  )
}

export const meta = {
  name: 'ship',
  gesture: 'it rides the swell',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['boat', 'sea', 'sail', 'ferry'],
}

export default ShipIcon
