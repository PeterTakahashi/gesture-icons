import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Loader pinwheel — it turns. VARIANT(loader): the whole pinwheel, ring
 * included, makes one honest 360° revolution about center; a full turn
 * always lands on the exact starting picture.
 * Base geometry: Lucide `loader-pinwheel` (ISC).
 */
const DUR = 0.9

export function LoaderPinwheelIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'loader pinwheel'}
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
        <path d="M22 12a1 1 0 0 1-10 0 1 1 0 0 0-10 0" />
        <path d="M7 20.7a1 1 0 1 1 5-8.7 1 1 0 1 0 5-8.6" />
        <path d="M7 3.3a1 1 0 1 1 5 8.6 1 1 0 1 0 5 8.6" />
        <circle cx="12" cy="12" r="10" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'loader-pinwheel',
  gesture: 'it turns',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['loading', 'spinner', 'wait', 'loader', 'pinwheel'],
}

export default LoaderPinwheelIcon
