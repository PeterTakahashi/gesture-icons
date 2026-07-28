import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Club — it follows suit. The same stamp as spade — press, pop, settle —
 * but without the flourish and 50ms softer: a calmer card laid down.
 * Base geometry: Lucide `club` (ISC).
 */
const DUR = 0.8

export function ClubIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'club'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.87, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.58, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M17.28 9.05a5.5 5.5 0 1 0-10.56 0A5.5 5.5 0 1 0 12 17.66a5.5 5.5 0 1 0 5.28-8.6Z" />
        <path d="M12 17.66L12 22" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'club',
  gesture: 'it follows suit',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['cards', 'suit', 'poker'],
}

export default ClubIcon
