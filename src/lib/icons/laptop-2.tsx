import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Laptop 2 — it does what it means. VARIANT(device): the same hinge-tip as
 * laptop.tsx — here the screen is its own rect, so it tips back about its
 * own bottom edge (12px, 16px) where it would meet the base, while the base
 * line stays put.
 * Base geometry: Lucide `laptop-2` (ISC).
 */
const DUR = 1.0

export function Laptop2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'laptop 2'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="12" x="3" y="4" rx="2" ry="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, -6, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
      <line x1="2" x2="22" y1="20" y2="20" />
    </svg>
  )
}

export const meta = {
  name: 'laptop-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['device', 'laptop'],
}

export default Laptop2Icon
