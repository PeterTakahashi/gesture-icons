import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Database backup — the restore arrow winds back once. Only the little
 * circular-arrow badge turns, about its own bounding-box center (17px,16px,
 * derived from its arc endpoints spanning x12–22, y12.5–20) — the cylinder
 * behind it never moves, it is being backed up, not touched. A small
 * wind-up, a sweep past -300°, and a settle at a full -360°: a complete
 * revolution reads identically to rest, so the landing costs nothing, the
 * same free-landing trick as `rotate-ccw.tsx`.
 * Base geometry: Lucide `database-backup` (ISC).
 */
const DUR = 1.1
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1]

export function DatabaseBackupIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'database backup'}
      {...hoverProps}
    >
      {/* the cylinder — still, it is the thing being backed up */}
      <ellipse cx="12" cy="5" rx="9" ry="3" />
      <path d="M3 12a9 3 0 0 0 5 2.69" />
      <path d="M21 9.3V5" />
      <path d="M3 5v14a9 3 0 0 0 6.47 2.88" />
      {/* the restore badge — one full sweep about its own center */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 14, -300, -360],
            transition: { duration: DUR, times: [0, 0.16, 0.74, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <path d="M12 12v4h4" />
        <path d="M13 20a5 5 0 0 0 9-3 4.5 4.5 0 0 0-4.5-4.5c-1.33 0-2.54.54-3.41 1.41L12 16" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'database-backup',
  gesture: 'the backup runs',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['db', 'restore', 'safety'],
}

export default DatabaseBackupIcon
