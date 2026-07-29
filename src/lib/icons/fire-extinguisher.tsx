import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Fire extinguisher — it is grabbed. A readiness shake: the whole canister
 * rocks about its own base twice while it lifts an inch off the shelf for a
 * quick weight check, then it is set back down — checked and charged.
 * Base geometry: Lucide `fire-extinguisher` (ISC).
 */
const DUR = 1.0

export function FireExtinguisherIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'fire extinguisher'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '13px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -3, 3, -3, 3, 0],
            y: [0, -1, -1, -1, -1, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.15, 0.32, 0.5, 0.68, 0.85], ease: easeInOutCubic },
              y: { times: [0, 0.1, 0.4, 0.7, 0.85, 1], ease: [easeOutQuart, 'linear', 'linear', easeInOutCubic] },
            },
          },
        }}
      >
        <path d="M15 6.5V3a1 1 0 0 0-1-1h-2a1 1 0 0 0-1 1v3.5" />
        <path d="M9 18h8" />
        <path d="M18 3h-3" />
        <path d="M11 3a6 6 0 0 0-6 6v11" />
        <path d="M5 13h4" />
        <path d="M17 10a4 4 0 0 0-8 0v10a2 2 0 0 0 2 2h4a2 2 0 0 0 2-2Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'fire-extinguisher',
  gesture: 'it is grabbed',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['safety', 'fire', 'emergency', 'extinguisher'],
}

export default FireExtinguisherIcon
