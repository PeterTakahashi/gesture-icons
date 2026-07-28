import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Triangle — it stands stable. A rock test: it rocks about its own base and
 * settles back, decaying fast — it cannot be tipped.
 * Base geometry: Lucide `triangle` (ISC).
 */
const DUR = 0.65

export function TriangleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'triangle'}
      {...hoverProps}
    >
      <motion.path
        d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 3, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'triangle',
  gesture: 'it stands stable',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['shape', 'geometry'],
}

export default TriangleIcon
