import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * CPU — it computes a cycle. VARIANT(cpu family): the core pulses once and
 * the pins stretch outward together on the same clock — a single tick of
 * current through the whole chip, not a spin or a slide. The chip's outer
 * shell stays put; it's the socket, not the current.
 * Base geometry: Lucide `cpu` (ISC).
 */
const DUR = 0.7

export function CpuIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cpu'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 20v2" />
        <path d="M12 2v2" />
        <path d="M17 20v2" />
        <path d="M17 2v2" />
        <path d="M2 12h2" />
        <path d="M2 17h2" />
        <path d="M2 7h2" />
        <path d="M20 12h2" />
        <path d="M20 17h2" />
        <path d="M20 7h2" />
        <path d="M7 20v2" />
        <path d="M7 2v2" />
      </motion.g>
      <rect x="4" y="4" width="16" height="16" rx="2" />
      <motion.rect
        x="8" y="8" width="8" height="8" rx="1"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.08, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'cpu',
  gesture: 'it computes a cycle',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['processor', 'chip', 'hardware', 'cpu'],
}

export default CpuIcon
