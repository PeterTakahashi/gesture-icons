import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Loader 2 — it turns. VARIANT(loader): the same one honest 360° spin about
 * center; a full revolution always returns the arc to its starting picture,
 * so the landing is free no matter the shape.
 * Base geometry: Lucide `loader-2` (ISC).
 */
const DUR = 0.9

export function Loader2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'loader 2'}
      {...hoverProps}
    >
      <motion.path
        d="M21 12a9 9 0 1 1-6.219-8.56"
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
      />
    </svg>
  )
}

export const meta = {
  name: 'loader-2',
  gesture: 'it turns',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['loading', 'spinner', 'wait', 'loader'],
}

export default Loader2Icon
