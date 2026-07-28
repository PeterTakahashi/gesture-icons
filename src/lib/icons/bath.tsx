import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Bath — the water sloshes. The tub (basin, faucet bend, legs and waterline
 * all one rigid object) rocks gently about its base, decaying; the shower
 * nozzle mark is fixed to the same body but lags 4% behind because it sits
 * furthest from the pivot — a settled soak, not a tipping tub.
 * Base geometry: Lucide `bath` (ISC).
 */
const DUR = 1.0
const LAG = DUR * 0.04

export function BathIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const rock = {
    normal: { rotate: 0 },
    animate: {
      rotate: [0, -2, 2, -1, 0],
      transition: { duration: DUR, times: [0, 0.26, 0.52, 0.76, 1], ease: easeInOutCubic },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bath'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={rock}
      >
        <path d="M17 19v2" />
        <path d="M2 12h20" />
        <path d="M7 19v2" />
        <path d="M9 5 7.621 3.621A2.121 2.121 0 0 0 4 5v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-5" />
      </motion.g>
      {/* the nozzle mark, on the same body, lagging a beat behind */}
      <motion.path
        d="M10 4 8 6"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 2, -1, 0],
            transition: { duration: DUR, delay: LAG, times: [0, 0.26, 0.52, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bath',
  gesture: 'the water sloshes',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['bathroom', 'tub', 'relax'],
}

export default BathIcon
