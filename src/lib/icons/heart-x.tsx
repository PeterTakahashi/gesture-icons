import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Heart X — it is refused. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (18px, 15px, same beat as x.tsx) — while the
 * heart body holds perfectly still.
 * Base geometry: Lucide `heart-x` (ISC).
 */
const DUR = 0.85

export function HeartXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'heart x'}
      {...hoverProps}
    >
      <path d="M21.955 8.774a5.5 5.5 0 0 0-9.546-2.95.6.6 0 0 1-.818 0A5.5 5.5 0 0 0 2 9.5c0 2.3 1.5 4 3 5.5l5.508 5.332a2 2 0 0 0 2.57.352" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m15.5 12.5 5 5" />
        <path d="m20.5 12.5-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'heart-x',
  gesture: 'it is refused',
  family: 'rigid' as const,
  section: 'Commerce & feedback',
  tags: ['cancel', 'remove', 'heart'],
}

export default HeartXIcon
