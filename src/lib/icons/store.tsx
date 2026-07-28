import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Store — it opens shop. The scalloped awning unfurls, stretching a touch
 * taller from its fixed top edge and settling back; the building beneath —
 * door and walls — never moves, because a storefront doesn't shift, only
 * the canopy over it rolls out.
 * Base geometry: Lucide `store` (ISC).
 */
const DUR = 0.9

export function StoreIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'store'}
      {...hoverProps}
    >
      <path d="M15 21v-5a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v5" />
      <motion.path
        d="M17.774 10.31a1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.451 0 1.12 1.12 0 0 0-1.548 0 2.5 2.5 0 0 1-3.452 0 1.12 1.12 0 0 0-1.549 0 2.5 2.5 0 0 1-3.77-3.248l2.889-4.184A2 2 0 0 1 7 2h10a2 2 0 0 1 1.653.873l2.895 4.192a2.5 2.5 0 0 1-3.774 3.244"
        style={{ transformBox: 'view-box', transformOrigin: '12px 2px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M4 10.95V19a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8.05" />
    </svg>
  )
}

export const meta = {
  name: 'store',
  gesture: 'it opens shop',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['shop', 'business'],
}

export default StoreIcon
