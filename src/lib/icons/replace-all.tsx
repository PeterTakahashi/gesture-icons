import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Replace all — same swap as replace.tsx, but the target repeats: the
 * ghost slot recedes once, the arrow drops the value in, and BOTH target
 * boxes take the contact pop — the first on arrival, the second a beat
 * later — showing the replace propagating across the set, on one clock.
 * Base geometry: Lucide `replace-all` (ISC).
 */
const DUR = 1.0

export function ReplaceAllIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'replace all'}
      {...hoverProps}
    >
      {/* the ghost slot recedes as its value leaves */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0, 0.7, 0],
            y: [0, 0, -0.7, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.55, 0.9], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M14 4a1 1 0 0 1 1-1" />
        <path d="M15 10a1 1 0 0 1-1-1" />
        <path d="M21 4a1 1 0 0 0-1-1" />
        <path d="M21 9a1 1 0 0 1-1 1" />
      </motion.g>
      {/* the value drops down into place */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 2.2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m3 7 3 3 3-3" />
        <path d="M6 10V5a2 2 0 0 1 2-2h2" />
      </motion.g>
      {/* first target takes the pop on arrival */}
      <motion.rect
        x="3" y="14" width="7" height="7" rx="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.12, 1],
            transition: { duration: DUR, times: [0, 0.5, 0.63, 0.9], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      />
      {/* the second target, standing in for "all", takes the pop a beat later */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17.5px 17.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.12, 1],
            transition: { duration: DUR, times: [0, 0.58, 0.71, 0.96], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <path d="M14 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
        <path d="M19 14a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'replace-all',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'replace', 'all'],
}

export default ReplaceAllIcon
