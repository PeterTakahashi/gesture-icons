import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Waypoints — the legs connect. Reading the geometry as a single itinerary
 * (top stop → left stop → right stop → bottom stop, in the order the
 * connecting legs actually join them): the whole route implodes, the start
 * waypoint pops in, each leg pen-draws to the next stop, and that stop pops
 * on arrival — the itinerary building itself, once.
 * Base geometry: Lucide `waypoints` (ISC).
 */
const DUR = 1.3
const ERASE = 0.08

const legVariants = (drawStart: number, drawEnd: number) => ({
  normal: { pathLength: 1 },
  animate: {
    pathLength: [1, 0.001, 0.001, 1, 1],
    transition: {
      duration: DUR,
      times: [0, ERASE, drawStart, drawEnd, 1],
      ease: [easeInCubic, 'linear' as const, pen, 'linear' as const],
    },
  },
})

const stopVariants = (popStart: number, popPeak: number, popEnd: number) => ({
  normal: { scale: 1 },
  animate: {
    scale: [1, 0.001, 0.001, 1.3, 1, 1],
    transition: {
      duration: DUR,
      times: [0, ERASE, popStart, popPeak, popEnd, 1],
      ease: [easeInCubic, 'linear' as const, settleBack, easeOutQuart, 'linear' as const],
    },
  },
})

export function WaypointsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'waypoints'}
      {...hoverProps}
    >
      {/* start: top stop pops in first, the journey's departure */}
      <motion.circle cx="12" cy="4" r="2" initial="normal" animate={controls} variants={stopVariants(0.08, 0.13, 0.17)} />
      {/* leg 1: top -> left */}
      <motion.path d="m10.586 5.414-5.172 5.172" initial="normal" animate={controls} variants={legVariants(0.11, 0.32)} />
      <motion.circle cx="4" cy="12" r="2" initial="normal" animate={controls} variants={stopVariants(0.32, 0.37, 0.42)} />
      {/* leg 2: left -> right */}
      <motion.path d="M6 12h12" initial="normal" animate={controls} variants={legVariants(0.35, 0.57)} />
      <motion.circle cx="20" cy="12" r="2" initial="normal" animate={controls} variants={stopVariants(0.57, 0.62, 0.66)} />
      {/* leg 3: right -> bottom */}
      <motion.path d="m18.586 13.414-5.172 5.172" initial="normal" animate={controls} variants={legVariants(0.6, 0.82)} />
      <motion.circle cx="12" cy="20" r="2" initial="normal" animate={controls} variants={stopVariants(0.82, 0.87, 0.91)} />
    </svg>
  )
}

export const meta = {
  name: 'waypoints',
  gesture: 'the legs connect',
  family: 'draw-on' as const,
  section: 'Transport',
  tags: ['stops', 'route'],
}

export default WaypointsIcon
