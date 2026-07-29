import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * CCTV — it pans the room. The camera head rotates about its wall mount,
 * holding a beat at each end of its sweep — the slow, deliberate motion
 * you feel watched by. The wall bracket itself never moves.
 * Base geometry: Lucide `cctv` (ISC).
 */
const DUR = 1.4

export function CctvIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cctv'}
      {...hoverProps}
    >
      <path d="M2 19h3.76a2 2 0 0 0 1.8-1.1L9 15" />
      <path d="M2 21v-4" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 15px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, -8, 6, 6, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.44, 0.68, 0.86, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M16.75 12h3.632a1 1 0 0 1 .894 1.447l-2.034 4.069a1 1 0 0 1-1.708.134l-2.124-2.97" />
        <path d="M17.106 9.053a1 1 0 0 1 .447 1.341l-3.106 6.211a1 1 0 0 1-1.342.447L3.61 12.3a2.92 2.92 0 0 1-1.3-3.91L3.69 5.6a2.92 2.92 0 0 1 3.92-1.3z" />
        <path d="M7 9h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cctv',
  gesture: 'it pans the room',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['camera', 'surveillance', 'watch', 'cctv'],
}

export default CctvIcon
