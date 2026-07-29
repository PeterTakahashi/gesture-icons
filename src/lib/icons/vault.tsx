import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Vault — it locks tight. The dial is a plain circle, so any rotation lands
 * on an identical picture — free to turn -90° then +45° as a two-move
 * combination, each move holding a beat, before the door itself PRESSes
 * shut: a single deep, no-bounce squeeze (plain ease, no overshoot) — a
 * thunk, not a bounce.
 * Base geometry: Lucide `vault` (ISC).
 */
const DUR = 1.3

export function VaultIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'vault'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.92, 0.92, 1],
            transition: { duration: DUR, times: [0, 0.65, 0.8, 0.88, 1], ease: ['linear', easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      />
      <circle cx="7.5" cy="7.5" r=".5" fill="currentColor" />
      <path d="m7.9 7.9 2.7 2.7" />
      <circle cx="16.5" cy="7.5" r=".5" fill="currentColor" />
      <path d="m13.4 10.6 2.7-2.7" />
      <circle cx="7.5" cy="16.5" r=".5" fill="currentColor" />
      <path d="m7.9 16.1 2.7-2.7" />
      <circle cx="16.5" cy="16.5" r=".5" fill="currentColor" />
      <path d="m13.4 13.4 2.7 2.7" />
      <motion.circle
        cx="12" cy="12" r="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            // -90 then +45: a plain circle renders identically at -45 as at 0
            rotate: [0, -90, -90, -45, -45],
            transition: { duration: DUR, times: [0, 0.2, 0.32, 0.5, 0.62], ease: ['easeInOut', 'linear', 'easeInOut', 'linear'] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'vault',
  gesture: 'it locks tight',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['safe', 'bank', 'secure', 'vault'],
}

export default VaultIcon
