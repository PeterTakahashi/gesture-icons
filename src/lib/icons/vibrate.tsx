import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Vibrate — it buzzes silently. VARIANT(smartphone): the same fast, decaying
 * ±2.5° buzz, with the side vibration marks hard-blinking in time with it —
 * a true on/off step, never a fade — landing lit, as Lucide always draws it.
 * Base geometry: Lucide `vibrate` (ISC).
 */
const DUR = 0.6

const blink: Variants = {
  normal: { opacity: 1 },
  animate: {
    opacity: [1, 1, 0, 0, 1, 1, 0, 0, 1, 1],
    transition: {
      duration: DUR,
      times: [0, 0.12, 0.14, 0.28, 0.3, 0.44, 0.46, 0.6, 0.62, 1],
      ease: 'linear',
    },
  },
}

export function VibrateIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'vibrate'}
      {...hoverProps}
    >
      <motion.path d="m2 8 2 2-2 2 2 2-2 2" initial="normal" animate={controls} variants={blink} />
      <motion.path d="m22 8-2 2 2 2-2 2 2 2" initial="normal" animate={controls} variants={blink} />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2.5, 2.5, -2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.14, 0.3, 0.46, 0.62, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <rect width="8" height="14" x="8" y="5" rx="1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'vibrate',
  gesture: 'it buzzes silently',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['silent', 'haptic', 'phone'],
}

export default VibrateIcon
