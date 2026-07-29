import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Contact — the card is offered. The whole card lifts and tips a couple of
 * degrees as if handed across a desk, then settles back down flat; the
 * portrait inside rides along, unbothered.
 * Base geometry: Lucide `contact` (ISC).
 */
const DUR = 0.85

export function ContactIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'contact'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -1.5, 0],
            rotate: [0, -2, 0],
            transition: { duration: DUR, times: [0, 0.42, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 2v2" />
        <path d="M7 22v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
        <path d="M8 2v2" />
        <circle cx="12" cy="11" r="3" />
        <rect x="3" y="4" width="18" height="18" rx="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'contact',
  gesture: 'the card is offered',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['person', 'card', 'profile', 'contact'],
}

export default ContactIcon
