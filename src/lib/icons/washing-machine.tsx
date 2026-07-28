import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Washing machine — the drum tumbles. The drum ring and its S-mark turn
 * together a full 360° — always identical to rest, since a full turn is its
 * own free landing — slow to start, fast through the middle, slow to stop.
 * The whole body shakes ±0.4 only while the drum is spinning fast. Knob and
 * indicator light ride along with the shaking body.
 * Base geometry: Lucide `washing-machine` (ISC).
 */
const DUR = 1.2

export function WashingMachineIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'washing machine'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.4, -0.4, 0.35, -0.2, 0, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.38, 0.46, 0.54, 0.62, 0.7, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M3 6h3" />
        <path d="M17 6h.01" />
        <rect width="18" height="20" x="3" y="2" rx="2" />
        <motion.g
          style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 60, 300, 360],
              transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeInOutCubic, 'linear', easeInOutCubic] },
            },
          }}
        >
          <circle cx="12" cy="13" r="5" />
          <path d="M12 18a2.5 2.5 0 0 0 0-5 2.5 2.5 0 0 1 0-5" />
        </motion.g>
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'washing-machine',
  gesture: 'the drum tumbles',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['laundry', 'appliance'],
}

export default WashingMachineIcon
