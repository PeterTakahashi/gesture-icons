import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Satellite dish — it tracks the sky. The bowl and its feed horn rotate
 * about the dish's own base vertex — the point (14, 20) where the closing
 * straight edge of the bowl path lands, read straight off the geometry.
 * The two signal arcs erase and redraw outward from the focus once, small
 * arc first, after the dish settles.
 * Base geometry: Lucide `satellite-dish` (ISC).
 */
const DUR = 1.0

export function SatelliteDishIcon({
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
        times: [0, 0.46, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'satellite dish'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '14px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 5, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.6, 0.9], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M4 10a7.31 7.31 0 0 0 10 10Z" />
        <path d="m9 15 3-3" />
      </motion.g>
      <motion.path d="M17 13a6 6 0 0 0-6-6" initial="normal" animate={controls} variants={arc(0.58, 0.84)} />
      <motion.path d="M21 13A10 10 0 0 0 11 3" initial="normal" animate={controls} variants={arc(0.66, 0.94)} />
    </svg>
  )
}

export const meta = {
  name: 'satellite-dish',
  gesture: 'it tracks the sky',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['signal', 'radar'],
}

export default SatelliteDishIcon
