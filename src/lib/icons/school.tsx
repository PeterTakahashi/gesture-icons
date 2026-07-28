import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * School — recess bell. The roofline and its bell swing gently about the
 * ridge where they meet the walls, decaying to a stop, while the building
 * itself holds still — the bell rings, not the block.
 * Base geometry: Lucide `school` (ISC).
 */
const DUR = 1.0

export function SchoolIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'school'}
      {...hoverProps}
    >
      {/* building holds — recess */}
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="M18 4.933V21" />
      <path d="m6 11-3.52 2.147a1 1 0 0 0-.48.854V19a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a1 1 0 0 0-.48-.853L18 11" />
      <path d="M6 4.933V21" />
      {/* roof + bell sway about the ridge */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 6px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 5, -3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.42, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m4 6 7.106-3.79a2 2 0 0 1 1.788 0L20 6" />
        <circle cx="12" cy="9" r="2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'school',
  gesture: 'the bell rings out',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['education', 'learn'],
}

export default SchoolIcon
