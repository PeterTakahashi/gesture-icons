import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * File scan — it draws itself. The page holds, dipping once on the accent
 * frame; the four viewfinder corners pulse outward from their own fixed
 * corner points, staggered ~3% each in scan order (top-left → top-right →
 * bottom-left → bottom-right) — a focus-lock, not a fade.
 * Base geometry: Lucide `file-scan` (ISC).
 */
const DUR = 0.8
const CORNERS = [
  { d: 'M16 14a2 2 0 0 0-2 2', origin: '16px 14px', delay: 0 },
  { d: 'M20 14a2 2 0 0 1 2 2', origin: '20px 14px', delay: 0.05 },
  { d: 'M16 22a2 2 0 0 1-2-2', origin: '16px 22px', delay: 0.1 },
  { d: 'M20 22a2 2 0 0 0 2-2', origin: '20px 22px', delay: 0.15 },
]

export function FileScanIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file scan'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.6, 0.95], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M20 10V8a2.4 2.4 0 0 0-.706-1.704l-3.588-3.588A2.4 2.4 0 0 0 14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h4.35" />
        <path d="M14 2v5a1 1 0 0 0 1 1h5" />
      </motion.g>
      {CORNERS.map((c) => (
        <motion.path
          key={c.d}
          d={c.d}
          style={{ transformBox: 'view-box', transformOrigin: c.origin }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1.35, 1],
              transition: { duration: DUR, delay: c.delay, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'file-scan',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'scan'],
}

export default FileScanIcon
