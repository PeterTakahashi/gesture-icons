import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Kayak — it paddles a stroke. The hull rocks about its own center while
 * the whole boat drives forward on the stroke and glides, drifting back as
 * the push fades — one stroke, glide, drift back.
 * Base geometry: Lucide `kayak` (ISC).
 */
const DUR = 1.0

export function KayakIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'kayak'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0 },
          animate: {
            rotate: [0, -3, 3, -1, 0],
            x: [0, 2, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.22, 0.46, 0.7, 1], ease: easeInOutCubic },
              x: { times: [0, 0.5, 1], ease: [easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      >
        <path d="M18 17a1 1 0 0 0-1 1v1a2 2 0 1 0 2-2z" />
        <path d="M20.97 3.61a.45.45 0 0 0-.58-.58C10.2 6.6 6.6 10.2 3.03 20.39a.45.45 0 0 0 .58.58C13.8 17.4 17.4 13.8 20.97 3.61" />
        <path d="m6.707 6.707 10.586 10.586" />
        <path d="M7 5a2 2 0 1 0-2 2h1a1 1 0 0 0 1-1z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'kayak',
  gesture: 'it paddles a stroke',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['water', 'boat', 'outdoor', 'kayak'],
}

export default KayakIcon
