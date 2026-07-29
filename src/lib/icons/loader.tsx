import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Loader — it turns. One full revolution about the center, slow-fast-slow.
 * A 360° turn always lands on the exact starting picture regardless of the
 * glyph's own symmetry, so the landing costs nothing — it is a loader,
 * one honest spin.
 * Base geometry: Lucide `loader` (ISC).
 */
const DUR = 0.9

export function LoaderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'loader'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 360],
            transition: { duration: DUR, ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 2v4" />
        <path d="m16.2 7.8 2.9-2.9" />
        <path d="M18 12h4" />
        <path d="m16.2 16.2 2.9 2.9" />
        <path d="M12 18v4" />
        <path d="m4.9 19.1 2.9-2.9" />
        <path d="M2 12h4" />
        <path d="m4.9 4.9 2.9 2.9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'loader',
  gesture: 'it turns',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['loading', 'spinner', 'wait', 'loader'],
}

export default LoaderIcon
