import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Amphora — it is set on the shelf. Museum hands: a careful lift with a
 * small cautious rotation, then a fragile, no-overshoot descent — nothing
 * this old gets a bouncy landing.
 * Base geometry: Lucide `amphora` (ISC).
 */
const DUR = 1.2

export function AmphoraIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'amphora'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -1.5, -1.5, 0],
            rotate: [0, -3, 2, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.68, 1], ease: [easeOutQuart, 'linear', easeOutQuint] },
              rotate: { times: [0, 0.4, 0.75, 1], ease: [easeOutQuart, easeOutQuart, easeOutQuint] },
            },
          },
        }}
      >
        <path d="M10 2v5.632c0 .424-.272.795-.653.982A6 6 0 0 0 6 14c.006 4 3 7 5 8" />
        <path d="M10 5H8a2 2 0 0 0 0 4h.68" />
        <path d="M14 2v5.632c0 .424.272.795.652.982A6 6 0 0 1 18 14c0 4-3 7-5 8" />
        <path d="M14 5h2a2 2 0 0 1 0 4h-.68" />
        <path d="M18 22H6" />
        <path d="M9 2h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'amphora',
  gesture: 'it is set on the shelf',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['vase', 'ancient', 'pottery', 'amphora'],
}

export default AmphoraIcon
