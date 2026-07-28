import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Volleyball — it is set. One clean rise on the hit, gravity pulling it
 * back down, a soft catch dip on the palms. The ball never spins — a set
 * is a straight vertical touch, not a serve — so only y moves; the seams
 * ride along for the whole trip.
 * Base geometry: Lucide `volleyball` (ISC).
 */
const DUR = 0.9

export function VolleyballIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'volleyball'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -3, 0, 0.5, 0],
            transition: {
              duration: DUR,
              times: [0, 0.35, 0.7, 0.85, 1],
              ease: [easeOutQuart, gravity, easeOutQuart, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M11 7a16 16 20 0 1 10.98 4.362" />
        <path d="M12 12a13 13 0 0 1-8.66 5" />
        <path d="M16.83 13.634a16 16 0 0 1-9.267 7.328" />
        <path d="M20.66 17A13 13 0 0 0 12 12a13 13 0 0 1 0-10" />
        <path d="M8.17 15.366a16 16 0 0 1-1.713-11.69" />
        <circle cx="12" cy="12" r="10" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'volleyball',
  gesture: 'it is set',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['ball', 'beach', 'sport'],
}

export default VolleyballIcon
