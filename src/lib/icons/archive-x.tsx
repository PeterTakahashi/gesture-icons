import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Archive x — it is refused. Only the X shakes no — a decaying rotation
 * about its own center, same language as x-circle.tsx and shield-x.tsx —
 * while the archive body holds perfectly still.
 * Base geometry: Lucide `archive-x` (ISC).
 */
const DUR = 0.85

export function ArchiveXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'archive x'}
      {...hoverProps}
    >
      <rect width="20" height="5" x="2" y="3" rx="1" />
      <path d="M4 8v11a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -14, 11, -7, 4, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m9.5 17 5-5" />
        <path d="m9.5 12 5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'archive-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['cancel', 'remove', 'archive'],
}

export default ArchiveXIcon
