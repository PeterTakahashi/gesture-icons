import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Hand metal — it rocks on. The two "horn" fingers are not both isolated
 * paths in this glyph (one is fused into the same path as the thumb and
 * palm), so they can't be shaken independently without redrawing the
 * geometry — the whole hand carries the rock instead, hinged at the wrist,
 * with a punch upward for energy.
 * Base geometry: Lucide `hand-metal` (ISC).
 */
const DUR = 0.7

export function HandMetalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'hand metal'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 8, -8, 4, 0],
            y: [0, -1, -1, -0.3, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
              y: { times: [0, 0.18, 0.5, 0.75, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
            },
          },
        }}
      >
        <path d="M18 12.5V10a2 2 0 0 0-2-2a2 2 0 0 0-2 2v1.4" />
        <path d="M14 11V9a2 2 0 1 0-4 0v2" />
        <path d="M10 10.5V5a2 2 0 1 0-4 0v9" />
        <path d="m7 15-1.76-1.76a2 2 0 0 0-2.83 2.82l3.6 3.6C7.5 21.14 9.2 22 12 22h2a8 8 0 0 0 8-8V7a2 2 0 1 0-4 0v5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'hand-metal',
  gesture: 'it rocks on',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['rock', 'music', 'concert'],
}

export default HandMetalIcon
