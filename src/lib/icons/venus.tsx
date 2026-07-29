import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Venus — the mirror turns. The circle gives a soft pulse first, then the
 * cross stem below PRESSes down and springs back — the symbol grounded,
 * one motion handing off to the next on the same clock.
 * Base geometry: Lucide `venus` (ISC).
 */
const DUR = 1.0

export function VenusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'venus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.75, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M12 15v7" />
        <path d="M9 19h6" />
      </motion.g>
      <motion.circle
        cx="12" cy="9" r="6"
        style={{ transformBox: 'view-box', transformOrigin: '12px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 1, 1],
            transition: { duration: DUR, times: [0, 0.3, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'venus',
  gesture: 'the mirror turns',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['gender', 'female', 'symbol', 'venus'],
}

export default VenusIcon
