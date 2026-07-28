import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity, easeOutExpo, easeInOutCubic } from '../core/easings'

/**
 * Truck — it hops with the load. The whole rig lifts, falls with gravity,
 * dips past rest on landing and settles — a loaded hop, not a levitation.
 * Two speed lines stream out from behind it while airborne and drain back
 * in the instant it lands, the same dash-length mechanism as cart.tsx.
 * Base geometry: Lucide `truck` (ISC).
 */
const DUR = 1.0

export function TruckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'truck'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -2.2, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.32, 0.58, 1], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      >
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M15 18H9" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </motion.g>
      {/* speed lines: stream out while airborne, drain back in on landing */}
      {[{ d: 'M-1 9h3', delay: 0 }, { d: 'M-2 13h2.6', delay: 0.05 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: l.delay,
                pathLength: { times: [0, 0.2, 0.5, 0.6, 1], ease: [easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.02, 0.58, 0.6, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'truck',
  gesture: 'it hops with the load',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['delivery', 'shipping', 'logistics'],
}

export default TruckIcon
