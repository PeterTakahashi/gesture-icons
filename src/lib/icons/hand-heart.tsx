import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Hand heart — it offers love. The heart gives two small lub-dub pulses
 * while the hand lifts in offering; both come to rest together.
 * Base geometry: Lucide `hand-heart` (ISC).
 */
const DUR = 0.9

export function HandHeartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hand heart'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
        <path d="m2 15 6 6" />
        <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
      </motion.g>
      <motion.path
        d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.2, 1, 1.2, 1],
            transition: {
              duration: DUR,
              times: [0, 0.15, 0.3, 0.45, 0.6],
              ease: [settleBack, easeInOutCubic, settleBack, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'hand-heart',
  gesture: 'it offers love',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['care', 'give', 'charity'],
}

export default HandHeartIcon
