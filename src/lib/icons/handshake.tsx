import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Handshake — the deal is made. The clasped hands pump down and up twice,
 * firm and decaying, right at the clasp — signed and sealed.
 * Base geometry: Lucide `handshake` (ISC).
 */
const DUR = 0.9

export function HandshakeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'handshake'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.2, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.46, 0.72, 1], ease: [easeOutQuart, gravity, easeOutQuart, gravity] },
          },
        }}
      >
        <path d="m11 17 2 2a1 1 0 1 0 3-3" />
        <path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" />
        <path d="m21 3 1 11h-2" />
        <path d="M3 3 2 14l6.5 6.5a1 1 0 1 0 3-3" />
        <path d="M3 4h8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'handshake',
  gesture: 'the deal is made',
  family: 'rigid' as const,
  section: 'Hands',
  tags: ['agreement', 'deal', 'partnership', 'handshake'],
}

export default HandshakeIcon
