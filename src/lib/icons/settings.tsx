import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Settings — it clicks one notch. Lucide's gear is 8-fold symmetric (a
 * tooth every 45°), so a 45° turn lands on the exact same picture — the
 * gear reads as "adjusted one step," not spun.
 * Base geometry: Lucide `settings` (ISC).
 */
const DUR = 0.9

export function SettingsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'settings'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 49, 45],
            transition: {
              duration: DUR,
              times: [0, 0.18, 0.6, 1],
              ease: [easeInOutCubic, [0.5, 0, 0.3, 1.15], easeOutQuart],
            },
          },
        }}
      >
        <path d="M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915" />
        <circle cx="12" cy="12" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'settings',
  gesture: 'it clicks one notch',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['gear', 'preferences', 'config', 'cog'],
}

export default SettingsIcon
