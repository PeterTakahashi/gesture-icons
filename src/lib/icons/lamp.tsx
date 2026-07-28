import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo, easeOutQuart } from '../core/easings'

/**
 * Lamp — it is switched on. The shade tips about the stem top it hangs
 * from, and two short rays draw on beneath it and erase — dash length, never
 * a fade — reading as a flick of light. Stem and base never move.
 * Base geometry: Lucide `lamp` (ISC).
 */
const DUR = 0.9

export function LampIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lamp'}
      {...hoverProps}
    >
      <path d="M12 12v6" />
      <motion.path
        d="M4.077 10.615A1 1 0 0 0 5 12h14a1 1 0 0 0 .923-1.385l-3.077-7.384A2 2 0 0 0 15 2H9a2 2 0 0 0-1.846 1.23Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M8 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1z" />
      {/* light ticks: dash-hidden rays flicking on under the shade, then gone */}
      {[{ d: 'M9 14.5v2', delay: 0 }, { d: 'M15 14.5v2', delay: 0.06 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: 0.24 + l.delay,
                pathLength: { times: [0, 0.14, 0.3, 0.5, 0.66, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.13, 0.14, 0.65, 0.66, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'lamp',
  gesture: 'it is switched on',
  family: 'secondary' as const,
  section: 'Home',
  tags: ['light', 'furniture'],
}

export default LampIcon
