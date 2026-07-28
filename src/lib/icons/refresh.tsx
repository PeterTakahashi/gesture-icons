import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Refresh — it goes around once. A small wind-up against the direction of
 * travel, then one full revolution about the glyph's own center. 360° is
 * the same picture as 0°, so the landing is free — no separate settle needed.
 * Base geometry: Lucide `refresh-cw` (ISC).
 */
const DUR = 1.0

export function RefreshIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'refresh'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -15, 360],
            transition: { duration: DUR, times: [0, 0.18, 1], ease: [easeInOutCubic, [0.45, 0, 0.25, 1]] },
          },
        }}
      >
        <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
        <path d="M21 3v5h-5" />
        <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
        <path d="M8 16H3v5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'refresh',
  gesture: 'it goes around once',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['reload', 'sync', 'update', 'cycle'],
}

export default RefreshIcon
