import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutExpo, easeOutQuart } from '../core/easings'

/**
 * Plug zap — VARIANT(plug): the prongs nudge along their own diagonal axis
 * into contact the same way `plug.tsx` does, just tilted to this glyph's
 * geometry. The bolt is erased ahead of the push and pen-draws back on with
 * an easeOutExpo the instant the prongs land — contact, then current.
 * Base geometry: Lucide `plug-zap` (ISC).
 */
const DUR = 0.95

export function PlugZapIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'plug zap'}
      {...hoverProps}
    >
      <path d="M6.3 20.3a2.4 2.4 0 0 0 3.4 0L12 18l-6-6-2.3 2.3a2.4 2.4 0 0 0 0 3.4Z" />
      <path d="m2 22 3-3" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.55, -1.56, 0],
            y: [0, -0.55, 1.56, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.56, 1], ease: [easeInCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M7.5 13.5 10 11" />
        <path d="M10.5 16.5 13 14" />
      </motion.g>
      <motion.path
        d="m18 3-4 4h6l-4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.1, 0.56, 0.9], ease: ['linear', 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'plug-zap',
  gesture: 'power flows in',
  family: 'draw-on' as const,
  section: 'Devices',
  tags: ['charge', 'power'],
}

export default PlugZapIcon
