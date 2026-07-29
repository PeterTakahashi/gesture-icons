import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Tent tree — VARIANT(tent): camp is made. The tent settles onto its ground
 * line exactly as in tent.tsx — a small squash, a slight spread as the guy
 * lines take the load, then taut. The pine beside it sways once, 3% later,
 * hinged where its trunk meets the ground. The sky mark holds still.
 * Base geometry: Lucide `tent-tree` (ISC).
 */
const DUR = 0.8

export function TentTreeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tent tree'}
      {...hoverProps}
    >
      <circle cx="4" cy="4" r="2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 4, -2.5, 1, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.3, 0.6, 0.85, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m14 5 3-3 3 3" />
        <path d="m14 10 3-3 3 3" />
        <path d="M17 14V2" />
      </motion.g>
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
        <path d="M17 14H7l-5 8h20Z" />
        <path d="M8 14v8" />
        <path d="m9 14 5 8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tent-tree',
  gesture: 'camp is made',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['outdoor', 'forest', 'camping', 'tent', 'tree'],
}

export default TentTreeIcon
