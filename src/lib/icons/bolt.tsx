import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Bolt — it tightens. TURN 60 about center: a hex head is 6-fold
 * symmetric, so a sixth-turn lands on the same picture — free landing.
 * A small wind-up, then a ratchet's two clicks (0→35°→60°) rather than
 * one smooth sweep, the way a wrench actually turns a nut.
 * Base geometry: Lucide `bolt` (ISC).
 */
const DUR = 0.9

export function BoltIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bolt'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 35, 35, 60],
            transition: { duration: DUR, times: [0, 0.18, 0.5, 0.58, 0.85], ease: [easeInOutCubic, easeOutQuart, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <circle cx="12" cy="12" r="4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bolt',
  gesture: 'it tightens',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['hardware', 'nut', 'fasten', 'bolt'],
}

export default BoltIcon
