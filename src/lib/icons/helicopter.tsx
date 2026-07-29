import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Helicopter — the rotor spools. The blade bar spins two full turns about
 * its own hub, linear the whole way — nothing in free flight is eased —
 * while the cabin bobs on its skids and settles; the skids themselves stay
 * planted on the ground.
 * Base geometry: Lucide `helicopter` (ISC).
 */
const DUR = 1.1

export function HelicopterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'helicopter'}
      {...hoverProps}
    >
      <motion.path
        d="M6 3h16"
        style={{ transformBox: 'view-box', transformOrigin: '14px 3px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 720],
            transition: { duration: DUR, ease: 'linear' },
          },
        }}
      />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 0.2, -0.05, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.8, 1], ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M11 17v4" />
        <path d="M14 3v8a2 2 0 0 0 2 2h5.865" />
        <path d="M17 17v4" />
        <path d="M18 17a4 4 0 0 0 4-4 8 6 0 0 0-8-6 6 5 0 0 0-6 5v3a2 2 0 0 0 2 2z" />
        <path d="M2 10v5" />
        <path d="M8 13H2" />
      </motion.g>
      <path d="M7 21h14" />
    </svg>
  )
}

export const meta = {
  name: 'helicopter',
  gesture: 'the rotor spools',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['fly', 'chopper', 'helicopter'],
}

export default HelicopterIcon
