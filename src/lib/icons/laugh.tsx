import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Laugh — it cracks up. Two quick hops (laughing shakes the whole body)
 * while the mouth stretches wider open on the beat — genuinely funny, not
 * just a smile. The eyes ride the hops without moving on their own.
 * Base geometry: Lucide `laugh` (ISC).
 */
const DUR = 0.75

export function LaughIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'laugh'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 0, -0.7, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.44, 0.68, 1], ease: [easeOutQuart, gravity, easeOutQuart, gravity] },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <motion.path
          d="M18 13a6 6 0 0 1-6 5 6 6 0 0 1-6-5h12Z"
          style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleY: 1 },
            animate: {
              scaleY: [1, 1.15, 1],
              transition: { duration: DUR, times: [0, 0.25, 0.5], ease: easeOutQuart },
            },
          }}
        />
        <line x1="9" x2="9.01" y1="9" y2="9" />
        <line x1="15" x2="15.01" y1="9" y2="9" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'laugh',
  gesture: 'it cracks up',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['happy', 'funny', 'face'],
}

export default LaughIcon
