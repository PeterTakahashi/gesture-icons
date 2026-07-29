import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Lectern — the speech begins. Hands set down on it with a quick press,
 * the whole stand giving a hair under the weight and springing back, then
 * a small tilt into the audience once it's steady — "thank you all for
 * coming."
 * Base geometry: Lucide `lectern` (ISC).
 */
const DUR = 0.9

export function LecternIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lectern'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 0.8, 0],
            rotate: [0, 0, -1.5, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.35, 0.7], ease: [easeInCubic, easeOutQuart] },
              rotate: { times: [0, 0.55, 0.8, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      >
        <path d="M16 12h3a2 2 0 0 0 1.902-1.38l1.056-3.333A1 1 0 0 0 21 6H3a1 1 0 0 0-.958 1.287l1.056 3.334A2 2 0 0 0 5 12h3" />
        <path d="M18 6V3a1 1 0 0 0-1-1h-3" />
        <rect width="8" height="12" x="8" y="10" rx="1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'lectern',
  gesture: 'the speech begins',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['podium', 'speech', 'present', 'lectern'],
}

export default LecternIcon
