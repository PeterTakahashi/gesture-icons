import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Rabbit — it twitches. Lucide's right ear is its own path, so it counter-
 * twitches about its base; the left ear is only a small notch fused into
 * the head outline, so that whole silhouette carries the opposing twitch
 * as the honest stand-in for "the other ear." Then one tiny hop — alert.
 * Base geometry: Lucide `rabbit` (ISC).
 */
const DUR = 0.9

export function RabbitIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'rabbit'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, -1.2, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.66, 0.92], ease: [easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '12px 4px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -6, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.42], ease: easeInOutCubic },
            },
          }}
        >
          <path d="M13 16a3 3 0 0 1 2.24 5" />
          <path d="M18 12h.01" />
          <path d="M18 21h-8a4 4 0 0 1-4-4 7 7 0 0 1 7-7h.2L9.6 6.4a1 1 0 1 1 2.8-2.8L15.8 7h.2c3.3 0 6 2.7 6 6v1a2 2 0 0 1-2 2h-1a3 3 0 0 0-3 3" />
          <path d="M7.612 12.524a3 3 0 1 0-1.6 4.3" />
        </motion.g>
        <motion.path
          d="M20 8.54V4a2 2 0 1 0-4 0v3"
          style={{ transformBox: 'view-box', transformOrigin: '18px 8.5px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 4, 0],
              transition: { duration: DUR, times: [0, 0.2, 0.42], ease: easeInOutCubic },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'rabbit',
  gesture: 'it twitches',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['bunny', 'animal', 'fast'],
}

export default RabbitIcon
