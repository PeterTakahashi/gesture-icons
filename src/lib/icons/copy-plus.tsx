import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Copy plus — one more is added. The plus dips to nothing and overshoots
 * back (the same stamp as user-plus.tsx), while the copy body takes a
 * small dip on the pop frame — everything else holds.
 * Base geometry: Lucide `copy-plus` (ISC).
 */
const DUR = 1.0

export function CopyPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.65, 0.9], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
        <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '15px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <line x1="15" x2="15" y1="12" y2="18" />
        <line x1="12" x2="18" y1="15" y2="15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'copy-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['add', 'new', 'copy', 'plus'],
}

export default CopyPlusIcon
