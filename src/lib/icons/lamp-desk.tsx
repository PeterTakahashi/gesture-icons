import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Lamp desk — it angles to the page. The head and its upper arm bar rotate
 * about the elbow joint where the lower arm bends toward the base, hold
 * aimed at the work, and return. The lower arm and base never move.
 * Base geometry: Lucide `lamp-desk` (ISC).
 */
const DUR = 1.0

export function LampDeskIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'lamp desk'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9.086px 6.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, -8, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.68, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M10.293 2.293a1 1 0 0 1 1.414 0l2.5 2.5 5.994 1.227a1 1 0 0 1 .506 1.687l-7 7a1 1 0 0 1-1.687-.506l-1.227-5.994-2.5-2.5a1 1 0 0 1 0-1.414z" />
        <path d="m14.207 4.793-3.414 3.414" />
      </motion.g>
      <path d="M3 20a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1z" />
      <path d="m9.086 6.5-4.793 4.793a1 1 0 0 0-.18 1.17L7 18" />
    </svg>
  )
}

export const meta = {
  name: 'lamp-desk',
  gesture: 'it angles to the page',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['light', 'desk', 'study'],
}

export default LampDeskIcon
