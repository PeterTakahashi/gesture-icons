import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Baggage claim — the bag arrives. Only the suitcase travels: it exits
 * right past the frame edge, is repositioned off-screen at the equal-times
 * wrap the way send.tsx jumps, and re-enters from the left onto the cart.
 * The cart frame, handle and wheels never move — a carousel arrives, it
 * doesn't rock.
 * Base geometry: Lucide `baggage-claim` (ISC).
 */
export function BaggageClaimIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'baggage claim'}
      {...hoverProps}
    >
      <path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" />
      <path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" />
      <motion.rect
        width="13" height="8" x="8" y="6" rx="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 17, 17, -23, -23, 0],
            transition: {
              duration: 1.2,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      />
      <circle cx="18" cy="20" r="2" />
      <circle cx="9" cy="20" r="2" />
    </svg>
  )
}

export const meta = {
  name: 'baggage-claim',
  gesture: 'the bag arrives',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['travel', 'luggage', 'airport'],
}

export default BaggageClaimIcon
