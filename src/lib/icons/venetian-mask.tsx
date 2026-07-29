import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Venetian mask — the masquerade begins. The whole mask, cheek marks
 * included, tilts as one rigid piece about its own center — regarding you
 * sideways, with a tiny lift — before it settles back level. Who's asking?
 * Base geometry: Lucide `venetian-mask` (ISC).
 */
const DUR = 1.0

export function VenetianMaskIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'venetian mask'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -5, 3, 0],
            y: [0, -0.4, 0.1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 11c-1.5 0-2.5.5-3 2" />
        <path d="M4 6a2 2 0 0 0-2 2v4a5 5 0 0 0 5 5 8 8 0 0 1 5 2 8 8 0 0 1 5-2 5 5 0 0 0 5-5V8a2 2 0 0 0-2-2h-3a8 8 0 0 0-5 2 8 8 0 0 0-5-2z" />
        <path d="M6 11c1.5 0 2.5.5 3 2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'venetian-mask',
  gesture: "the masquerade begins",
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['mask', 'carnival', 'mystery', 'venetian'],
}

export default VenetianMaskIcon
