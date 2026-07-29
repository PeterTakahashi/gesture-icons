import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * PC case — it powers on. The power LED blinks once, a true binary step
 * (a diode does not fade up, it switches), and then the whole case gives a
 * single quiet shiver as the fans spool up.
 * Base geometry: Lucide `pc-case` (ISC).
 */
const DUR = 0.9

export function PcCaseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pc case'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0, 0.4, -0.4, 0.4, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.35, 0.45, 0.55, 0.65, 1], ease: easeInOutCubic },
          },
        }}
      >
        <rect width="14" height="20" x="5" y="2" rx="2" />
        {/* the LED: a hard blink, never a fade */}
        <motion.path
          d="M15 14h.01"
          initial="normal"
          animate={controls}
          variants={{
            normal: { opacity: 1 },
            animate: {
              opacity: [1, 1, 0, 0, 1],
              transition: { duration: DUR, times: [0, 0.08, 0.09, 0.2, 0.21], ease: 'linear' },
            },
          }}
        />
        <path d="M9 6h6" />
        <path d="M9 10h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pc-case',
  gesture: 'it powers on',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['desktop', 'tower', 'gaming', 'case'],
}

export default PcCaseIcon
