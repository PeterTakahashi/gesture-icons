import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Headset — VARIANT(headphones): the band bops to itself first, the same
 * small nod-along as `headphones.tsx`, then the mic boom rotates into
 * place on its own hinge at the earcup — "hello, how can I help?"
 * Base geometry: Lucide `headset` (ISC).
 */
const DUR = 1.0

export function HeadsetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'headset'}
      {...hoverProps}
    >
      <motion.path
        d="M3 11h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-5Zm0 0a9 9 0 1 1 18 0m0 0v5a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.96, 1, 0.95, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.34, 0.5, 0.68], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M21 16v2a4 4 0 0 1-4 4h-5"
        style={{ transformBox: 'view-box', transformOrigin: '21px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -4, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.8, 1], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'headset',
  gesture: 'support picks up',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['support', 'call', 'gaming', 'headset'],
}

export default HeadsetIcon
