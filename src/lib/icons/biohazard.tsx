import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Biohazard — it warns. TURN 120 about center: the trefoil is 3-fold
 * symmetric, so a full third-turn lands on a picture identical to rest —
 * free landing — with a small wind-up first, rotating into attention.
 * Base geometry: Lucide `biohazard` (ISC).
 */
const DUR = 1.0
const OVER_EASE: [number, number, number, number] = [0.45, 0, 0.25, 1.08]

export function BiohazardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'biohazard'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 11.9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 128, 120],
            transition: { duration: DUR, times: [0, 0.16, 0.78, 1], ease: [easeInOutCubic, OVER_EASE, easeOutQuart] },
          },
        }}
      >
        <circle cx="12" cy="11.9" r="2" />
        <path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" />
        <path d="m8.9 10.1 1.4.8" />
        <path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" />
        <path d="m15.1 10.1-1.4.8" />
        <path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" />
        <path d="M12 13.9v1.6" />
        <path d="M13.5 5.4c-1-.2-2-.2-3 0" />
        <path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5" />
        <path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'biohazard',
  gesture: 'it warns',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['danger', 'hazard', 'warning', 'biohazard'],
}

export default BiohazardIcon
