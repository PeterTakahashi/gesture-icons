import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Telescope — it finds a star. The tube (body, top rail, objective lens and
 * eyepiece dial) sweeps about the tripod head — derived from where the two
 * legs' paths actually converge, (12, 14.79) — pans out, holds a beat on the
 * find, and pans back. The tripod legs and the brace strut planted in them
 * never move: a mount doesn't sway when the tube does.
 * Base geometry: Lucide `telescope` (ISC).
 */
const DUR = 1.1

export function TelescopeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'telescope'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14.79px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, -6, 0],
            transition: { duration: DUR, times: [0, 0.38, 0.68, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="m10.065 12.493-6.18 1.318a.934.934 0 0 1-1.108-.702l-.537-2.15a1.07 1.07 0 0 1 .691-1.265l13.504-4.44" />
        <path d="m13.56 11.747 4.332-.924" />
        <path d="M16.485 5.94a2 2 0 0 1 1.455-2.425l1.09-.272a1 1 0 0 1 1.212.727l1.515 6.06a1 1 0 0 1-.727 1.213l-1.09.272a2 2 0 0 1-2.425-1.455z" />
        <circle cx="12" cy="13" r="2" />
      </motion.g>
      {/* the mount: tripod legs and brace never move */}
      <path d="m16 21-3.105-6.21" />
      <path d="m6.158 8.633 1.114 4.456" />
      <path d="m8 21 3.105-6.21" />
    </svg>
  )
}

export const meta = {
  name: 'telescope',
  gesture: 'it finds a star',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['astronomy', 'discover', 'observe'],
}

export default TelescopeIcon
