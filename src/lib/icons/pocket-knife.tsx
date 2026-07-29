import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Pocket knife — the blade folds out. The blade hinges at the rivet where
 * it meets the top of the handle, swings open further than its resting
 * angle, holds a beat as if inspected, then folds back with a firm click
 * stop. The handle casing and its grip texture never move.
 * Base geometry: Lucide `pocket-knife` (ISC).
 */
const DUR = 1.0

export function PocketKnifeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pocket knife'}
      {...hoverProps}
    >
      <path d="M3 2v1c0 1 2 1 2 2S3 6 3 7s2 1 2 2-2 1-2 2 2 1 2 2" />
      <path d="M18 6h.01" />
      <path d="M6 18h.01" />
      {/* the blade hinges at the rivet, (18,6) */}
      <motion.path
        d="M20.83 8.83a4 4 0 0 0-5.66-5.66l-12 12a4 4 0 1 0 5.66 5.66Z"
        style={{ transformBox: 'view-box', transformOrigin: '18px 6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -25, -25, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <path d="M18 11.66V22a4 4 0 0 0 4-4V6" />
    </svg>
  )
}

export const meta = {
  name: 'pocket-knife',
  gesture: 'the blade folds out',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['knife', 'multi-tool', 'camp', 'pocket'],
}

export default PocketKnifeIcon
