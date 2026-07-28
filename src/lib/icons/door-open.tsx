import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Door open — it swings open. Only the leaf (and its knob) swings, hinged
 * at the floor-level edge where the door meets the sill — out wider, a held
 * beat, then shut with an accelerating easeInCubic; the fixed frame and
 * floor take a thump exactly on the contact frame, never before.
 * Base geometry: Lucide `door-open` (ISC).
 */
const DUR = 1.1

export function DoorOpenIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'door open'}
      {...hoverProps}
    >
      {/* fixed frame and floor: still, except for the closing thump */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.9, 0.94, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M11 20H2" />
        <path d="M11 4H8a2 2 0 0 0-2 2v14" />
        <path d="M22 20h-3" />
      </motion.g>
      {/* the door leaf swings from its floor-level hinge */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, -12, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.65, 0.9], ease: [easeOutQuart, 'linear', easeInCubic] },
          },
        }}
      >
        <path d="M11 4.562v16.157a1 1 0 0 0 1.242.97L19 20V5.562a2 2 0 0 0-1.515-1.94l-4-1A2 2 0 0 0 11 4.561z" />
        <path d="M14 12h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'door-open',
  gesture: 'it swings open',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['enter', 'exit', 'room'],
}

export default DoorOpenIcon
