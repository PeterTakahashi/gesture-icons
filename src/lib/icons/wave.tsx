import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Wave — the hand waves hello. Hinged at the wrist, first swing widest,
 * each one after smaller, settling exactly upright.
 * Base geometry: Lucide `hand` (ISC).
 */
export function WaveIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'waving hand'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -18, 14, -11, 7, -3, 0],
            transition: { duration: 1.15, times: [0, 0.16, 0.34, 0.52, 0.7, 0.86, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M18 11V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2" />
        <path d="M14 10V4a2 2 0 0 0-2-2a2 2 0 0 0-2 2v2" />
        <path d="M10 10.5V6a2 2 0 0 0-2-2a2 2 0 0 0-2 2v8" />
        <path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'wave',
  gesture: 'the hand waves hello',
  family: 'rigid' as const,
  section: 'Hands',
  tags: ['hand', 'hello', 'greeting', 'bye'],
}

export default WaveIcon
