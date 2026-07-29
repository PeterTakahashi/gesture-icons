import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Concierge bell — it is rung for service. The button takes a fast press
 * first, and the dome answers right behind it with a decaying ding-ding
 * shake about the point it sits on; the base plate never moves.
 * Base geometry: Lucide `concierge-bell` (ISC).
 */
const DUR = 0.9

export function ConciergeBellIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'concierge bell'}
      {...hoverProps}
    >
      <path d="M3 20a1 1 0 0 1-1-1v-1a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1Z" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -2, 2, -1, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.34, 0.52, 0.68, 0.84, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M20 16a8 8 0 1 0-16 0" />
        <path d="M12 4v4" />
        <motion.path
          d="M10 4h4"
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 1, 0],
              transition: { duration: DUR, times: [0, 0.1, 0.16], ease: [easeInCubic, easeOutQuart] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'concierge-bell',
  gesture: 'it is rung for service',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['hotel', 'service', 'ring', 'concierge', 'bell'],
}

export default ConciergeBellIcon
