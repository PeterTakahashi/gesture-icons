import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Brain — it sparks a thought. The whole brain pulses in two waves about
 * its center — an idea arriving, hemispheres firing together, never split
 * apart.
 * Base geometry: Lucide `brain` (ISC).
 */
const DUR = 0.85

export function BrainIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'brain'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.06, 0.98, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.48, 0.72, 1], ease: [easeOutQuint, easeInOutCubic, easeInOutCubic, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 18V5" />
        <path d="M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4" />
        <path d="M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5" />
        <path d="M17.997 5.125a4 4 0 0 1 2.526 5.77" />
        <path d="M18 18a4 4 0 0 0 2-7.464" />
        <path d="M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517" />
        <path d="M6 18a4 4 0 0 1-2-7.464" />
        <path d="M6.003 5.125a4 4 0 0 0-2.526 5.77" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'brain',
  gesture: 'it sparks a thought',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['mind', 'think', 'ai'],
}

export default BrainIcon
