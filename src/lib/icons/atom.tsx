import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Atom — the electrons orbit. Both orbit ellipses counter-TURN about the
 * shared nucleus (12px,12px) — one small wind-up, a swing to ±25°, and a
 * return — running the opposite sign on the same clock, so they cross like
 * real orbitals rather than spinning in lockstep. The nucleus dot pulses
 * once, right as the swing peaks: one quantum of motion.
 * Base geometry: Lucide `atom` (ISC).
 */
const DUR = 1.0

export function AtomIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'atom'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.4, 1],
            transition: { duration: DUR, times: [0, 0.55, 0.68, 0.85], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M20.2 20.2c2.04-2.03.02-7.36-4.5-11.9-4.54-4.52-9.87-6.54-11.9-4.5-2.04 2.03-.02 7.36 4.5 11.9 4.54 4.52 9.87 6.54 11.9 4.5Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -5, 25, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.65, 1], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M15.7 15.7c4.52-4.54 6.54-9.87 4.5-11.9-2.03-2.04-7.36-.02-11.9 4.5-4.52 4.54-6.54 9.87-4.5 11.9 2.03 2.04 7.36.02 11.9-4.5Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 5, -25, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.65, 1], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'atom',
  gesture: 'the electrons orbit',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['physics', 'science', 'energy'],
}

export default AtomIcon
