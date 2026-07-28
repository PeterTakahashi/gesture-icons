import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Warehouse — the shutter opens. Each interior door line nudges up and
 * settles back, bottom-most first, the one above it a beat later — the
 * roller door breathing through one open-close cycle without ever leaving
 * the frame it's built from.
 * Base geometry: Lucide `warehouse` (ISC).
 */
const DUR = 0.9

export function WarehouseIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const slat = (delay: number) => ({
    normal: { y: 0 },
    animate: {
      y: [0, 0.5, -1.2, 0],
      transition: { duration: DUR, delay, times: [0, 0.18, 0.55, 1], ease: [easeInOutCubic, easeInOutCubic, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'warehouse'}
      {...hoverProps}
    >
      <path d="M18 21V10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1v11" />
      <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 1.132-1.803l7.95-3.974a2 2 0 0 1 1.837 0l7.948 3.974A2 2 0 0 1 22 8z" />
      <motion.path d="M6 17h12" initial="normal" animate={controls} variants={slat(0)} />
      <motion.path d="M6 13h12" initial="normal" animate={controls} variants={slat(0.06)} />
    </svg>
  )
}

export const meta = {
  name: 'warehouse',
  gesture: 'the shutter opens',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['storage', 'logistics'],
}

export default WarehouseIcon
