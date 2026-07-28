import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Bug off — the bug is squashed. Every leg, antenna, and the body itself
 * give one last nervous skitter — smaller than bug.tsx's live jitter, and
 * it decays to a dead stop rather than continuing — while the slash erases
 * and pen-draws back across the whole thing. The slash finishes after the
 * skitter has already gone still: fixed.
 * Base geometry: Lucide `bug-off` (ISC).
 */
const DUR = 0.9

export function BugOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bug off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, rotate: 0 },
          animate: {
            x: [0, -1.3, 1.4, -0.6, 0],
            rotate: [0, -2, 2, -1, 0],
            transition: { duration: DUR, times: [0, 0.12, 0.28, 0.42, 0.55], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12 20v-8" />
        <path d="M12.656 7H14a4 4 0 0 1 4 4v1.344" />
        <path d="M14.12 3.88 16 2" />
        <path d="M17.123 17.123A6 6 0 0 1 6 14v-3a4 4 0 0 1 1.72-3.287" />
        <path d="M21 5a4 4 0 0 1-3.55 3.97" />
        <path d="M22 13h-3.344" />
        <path d="M3 21a4 4 0 0 1 3.81-4" />
        <path d="M3 5a4 4 0 0 0 3.55 3.97" />
        <path d="M6 13H2" />
        <path d="m8 2 1.88 1.88" />
        <path d="M9.712 4.06A3 3 0 0 1 15 6v1.13" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.1, 0.2, 0.75], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bug-off',
  gesture: 'the bug is squashed',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['fixed', 'debug', 'done'],
}

export default BugOffIcon
