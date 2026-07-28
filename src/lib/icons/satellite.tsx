import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Satellite — it re-orients. The body and its two solar panels rotate as
 * one rigid group about the assembly's own center — the bounding box of the
 * body diamond and both panels lands exactly on (13.5, 10.5) — trimming its
 * aim before it settles back. The broadcast wave at the ground stays put;
 * it isn't part of the satellite.
 * Base geometry: Lucide `satellite` (ISC).
 */
const DUR = 0.85

export function SatelliteIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'satellite'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13.5px 10.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 3, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.66, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m13.5 6.5-3.148-3.148a1.205 1.205 0 0 0-1.704 0L6.352 5.648a1.205 1.205 0 0 0 0 1.704L9.5 10.5" />
        <path d="M16.5 7.5 19 5" />
        <path d="m17.5 10.5 3.148 3.148a1.205 1.205 0 0 1 0 1.704l-2.296 2.296a1.205 1.205 0 0 1-1.704 0L13.5 14.5" />
        <path d="M9.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l4.296-4.296a1.205 1.205 0 0 0 0-1.704l-2.296-2.296a1.205 1.205 0 0 0-1.704 0z" />
      </motion.g>
      <path d="M9 21a6 6 0 0 0-6-6" />
    </svg>
  )
}

export const meta = {
  name: 'satellite',
  gesture: 'it re-orients',
  family: 'rigid' as const,
  section: 'Devices',
  tags: ['space', 'signal'],
}

export default SatelliteIcon
