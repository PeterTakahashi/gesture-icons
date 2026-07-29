import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Copy check — the copy is confirmed. VARIANT(check): the tick un-draws
 * instantly then a pen redraws it, exactly as `check.tsx`; the front sheet
 * (the copy body) takes a small dip landing exactly on the frame the check
 * finishes writing on, and the back sheet never moves.
 * Base geometry: Lucide `copy-check` (ISC).
 */
const DUR = 0.9

export function CopyCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy check'}
      {...hoverProps}
    >
      <motion.path
        d="m12 15 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.75], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      <motion.rect
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.65, 0.75, 0.9], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

export const meta = {
  name: 'copy-check',
  gesture: 'the copy is confirmed',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['done', 'verified', 'copy', 'check'],
}

export default CopyCheckIcon
