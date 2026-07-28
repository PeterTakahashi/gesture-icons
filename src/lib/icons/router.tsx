import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Router — it finds the net. The two antenna arcs erase toward the mast and
 * redraw outward, small arc first, like `wifi.tsx`; once the signal is back
 * the two status dots blink once, hard steps, no fade — online.
 * Base geometry: Lucide `router` (ISC).
 */
const DUR = 1.1

export function RouterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const arc = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.14, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'router'}
      {...hoverProps}
    >
      <rect width="20" height="8" x="2" y="14" rx="2" />
      <motion.path
        d="M6.01 18H6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.68, 0.69, 0.78, 0.79], ease: 'linear' },
          },
        }}
      />
      <motion.path
        d="M10.01 18H10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { opacity: 1 },
          animate: {
            opacity: [1, 1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.74, 0.75, 0.84, 0.85], ease: 'linear' },
          },
        }}
      />
      <path d="M15 10v4" />
      <motion.path d="M17.84 7.17a4 4 0 0 0-5.66 0" initial="normal" animate={controls} variants={arc(0.24, 0.5)} />
      <motion.path d="M20.66 4.34a8 8 0 0 0-11.31 0" initial="normal" animate={controls} variants={arc(0.32, 0.6)} />
    </svg>
  )
}

export const meta = {
  name: 'router',
  gesture: 'it finds the net',
  family: 'draw-on' as const,
  section: 'Devices',
  tags: ['wifi', 'network', 'modem'],
}

export default RouterIcon
