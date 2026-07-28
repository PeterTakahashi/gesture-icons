import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Smartphone — it buzzes. A silent-mode vibration: tiny, fast rocking about
 * the phone's own center, decaying to a stop. No sound icon needed — the
 * shake reads as "on silent" on its own.
 * Base geometry: Lucide `smartphone` (ISC).
 */
const DUR = 0.6

export function SmartphoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'smartphone'}
      {...hoverProps}
    >
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
        <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
        <path d="M12 18h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'smartphone',
  gesture: 'it buzzes',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['mobile', 'phone', 'device'],
}

export default SmartphoneIcon
