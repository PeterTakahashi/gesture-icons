import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Snowflake — it settles softly. Six-fold symmetry means a 60-degree turn
 * lands back on the same picture — a free turn nobody can catch as a turn —
 * so it spins past that mark and eases back onto it while bobbing once,
 * like a flake tumbling a single facet as it drifts down.
 * Base geometry: Lucide `snowflake` (ISC).
 */
const DUR = 1.2
const turn: [number, number, number, number] = [0.4, 0, 0.3, 1]

export function SnowflakeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'snowflake'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 66, 60],
            y: [0, -1.2, 0],
            transition: {
              rotate: { duration: DUR, times: [0, 0.55, 1], ease: turn },
              y: { duration: DUR, times: [0, 0.4, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="m10 20-1.25-2.5L6 18" />
        <path d="M10 4 8.75 6.5 6 6" />
        <path d="m14 20 1.25-2.5L18 18" />
        <path d="m14 4 1.25 2.5L18 6" />
        <path d="m17 21-3-6h-4" />
        <path d="m17 3-3 6 1.5 3" />
        <path d="M2 12h6.5L10 9" />
        <path d="m20 10-1.5 2 1.5 2" />
        <path d="M22 12h-6.5L14 15" />
        <path d="m4 10 1.5 2L4 14" />
        <path d="m7 21 3-6-1.5-3" />
        <path d="m7 3 3 6h4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'snowflake',
  gesture: 'it settles softly',
  family: 'rigid' as const,
  section: 'Nature',
  tags: ['winter', 'cold', 'snow', 'frozen'],
}

export default SnowflakeIcon
