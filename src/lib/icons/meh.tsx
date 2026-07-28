import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Meh — it shrugs. The flat mouth tilts once, side to side — the facial
 * shrug — while the eyes blink once together, a true binary step, never a
 * fade.
 * Base geometry: Lucide `meh` (ISC).
 */
const DUR = 0.75

export function MehIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const eyeVariants = {
    normal: { opacity: 1 },
    animate: {
      opacity: [1, 1, 0, 0, 1, 1],
      transition: { duration: DUR, times: [0, 0.35, 0.37, 0.5, 0.52, 1], ease: 'linear' as const },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'meh'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.line
        x1="8" x2="16" y1="15" y2="15"
        style={{ transformBox: 'view-box', transformOrigin: '12px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, -2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.line x1="9" x2="9.01" y1="9" y2="9" initial="normal" animate={controls} variants={eyeVariants} />
      <motion.line x1="15" x2="15.01" y1="9" y2="9" initial="normal" animate={controls} variants={eyeVariants} />
    </svg>
  )
}

export const meta = {
  name: 'meh',
  gesture: 'it shrugs',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['neutral', 'whatever', 'face'],
}

export default MehIcon
