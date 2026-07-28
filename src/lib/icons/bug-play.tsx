import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bug play — debugging begins. The play triangle NUDGEs right and
 * settles back — the click that starts the run — while the bug itself
 * (every leg and antenna, same jitter as bug.tsx) SHAKEs nervously the
 * whole time it's being watched, decaying out only near the very end.
 * Base geometry: Lucide `bug-play` (ISC).
 */
const DUR = 0.95

export function BugPlayIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bug play'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1.4, 1.4, -1, 0.7, -0.3, 0],
            rotate: [0, -2.5, 2.2, -1.6, 1, 0],
            transition: { duration: DUR, times: [0, 0.1, 0.26, 0.42, 0.58, 0.75, 0.92], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10 19.655A6 6 0 0 1 6 14v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 3.97" />
        <path d="M14.12 3.88 16 2" />
        <path d="M21 5a4 4 0 0 1-3.55 3.97" />
        <path d="M3 21a4 4 0 0 1 3.81-4" />
        <path d="M3 5a4 4 0 0 0 3.55 3.97" />
        <path d="M6 13H2" />
        <path d="m8 2 1.88 1.88" />
        <path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" />
      </motion.g>
      <motion.path
        d="M14 15.003a1 1 0 0 1 1.517-.859l4.997 2.997a1 1 0 0 1 0 1.718l-4.997 2.997a1 1 0 0 1-1.517-.86z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.5, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.4, 0.7], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bug-play',
  gesture: 'debugging begins',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['debug', 'run', 'test'],
}

export default BugPlayIcon
