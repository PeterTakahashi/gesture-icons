import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, settleBack } from '../core/easings'

/**
 * List plus — one more is added. The plus dips to nothing and overshoots
 * back (the same stamp as user-plus.tsx), while the list body takes a
 * small dip on the pop frame — everything else holds.
 * Base geometry: Lucide `list-plus` (ISC).
 */
const DUR = 1.0

export function ListPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list plus'}
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
        <path d="M16 5H3" />
        <path d="M11 12H3" />
        <path d="M16 19H3" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 12px' }}
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
        <path d="M18 9v6" />
        <path d="M21 12h-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'list-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['add', 'new', 'list', 'plus'],
}

export default ListPlusIcon
