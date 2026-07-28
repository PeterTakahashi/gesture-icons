import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack, easeOutQuart } from '../core/easings'

/**
 * Share — it broadcasts. The two links drain out of the hub and the far
 * nodes implode with them; the hub pulses once, then each link is
 * pen-drawn back out, and the far node it reaches pops on the exact frame
 * its own line arrives — one clock, so the arrival is exact, not
 * approximate.
 * Base geometry: Lucide `share-2` (ISC).
 */
const DUR = 1.2

export function ShareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const farNode = (drainEnd: number, popStart: number, popEnd: number): Variants => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.001, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.15, drainEnd, popStart, popEnd],
        ease: [easeInCubic, 'linear', 'linear', settleBack],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'share'}
      {...hoverProps}
    >
      <motion.circle
        cx="18" cy="5" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={farNode(0.4, 0.78, 0.92)}
      />
      {/* hub: survives, pulses once the links have drained */}
      <motion.circle
        cx="6" cy="12" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.32, 0.5, 1], ease: ['linear', settleBack, easeOutQuart, 'linear'] },
          },
        }}
      />
      <motion.circle
        cx="18" cy="19" r="3"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={farNode(0.3, 0.62, 0.78)}
      />
      <motion.line
        x1="8.59" x2="15.42" y1="13.51" y2="17.49"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.3, 0.62], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      <motion.line
        x1="15.41" x2="8.59" y1="6.51" y2="10.49"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.15, 0.4, 0.78], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'share',
  gesture: 'it broadcasts',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['network', 'nodes', 'social', 'connect'],
}

export default ShareIcon
