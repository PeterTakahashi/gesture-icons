import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { windupOvershoot, easeOutQuart } from '../core/easings'

/**
 * Beer — it clinks. The whole mug tips about its far bottom corner — a
 * toast lean — lifting a hair as it goes over, then rights itself with a
 * firm thump.
 * Base geometry: Lucide `beer` (ISC).
 */
const DUR = 0.9

export function BeerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'beer'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '5px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, 3, 0],
            y: [0, -0.5, 0.15, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.75, 1], ease: [windupOvershoot, easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M17 11h1a3 3 0 0 1 0 6h-1" />
        <path d="M9 12v6" />
        <path d="M13 12v6" />
        <path d="M14 7.5c-1 0-1.44.5-3 .5s-2-.5-3-.5-1.72.5-2.5.5a2.5 2.5 0 0 1 0-5c.78 0 1.57.5 2.5.5S9.44 2 11 2s2 1.5 3 1.5 1.72-.5 2.5-.5a2.5 2.5 0 0 1 0 5c-.78 0-1.5-.5-2.5-.5Z" />
        <path d="M5 8v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'beer',
  gesture: 'it clinks',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['drink', 'cheers', 'bar'],
}

export default BeerIcon
