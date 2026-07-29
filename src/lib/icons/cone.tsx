import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Cone — it stands watch. VARIANT(traffic-cone): a passing lean about the
 * base, decaying back upright — wobbled, not toppled.
 * Base geometry: Lucide `cone` (ISC).
 */
const DUR = 0.9

export function ConeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cone'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 2.5, -1, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m20.9 18.55-8-15.98a1 1 0 0 0-1.8 0l-8 15.98" />
        <ellipse cx="12" cy="19" rx="9" ry="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cone',
  gesture: 'it stands watch',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['geometry', '3d', 'cone'],
}

export default ConeIcon
