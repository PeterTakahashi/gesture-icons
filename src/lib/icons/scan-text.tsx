import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Scan text — it does what it means. The four corner brackets nudge inward
 * to frame the page, the way `scan.tsx` does; the text lines inside erase
 * and pen-redraw top to bottom, staggered, as if being read the instant the
 * frame closes on them.
 * Base geometry: Lucide `scan-text` (ISC).
 */
const DUR = 0.9
const NUDGE = { times: [0, 0.15, 0.5, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] }

export function ScanTextIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const line = (delay: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.16, 0.3, redrawEnd],
        ease: [easeInCubic, 'linear', pen],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan text'}
      {...hoverProps}
    >
      <motion.path
        d="M3 7V5a2 2 0 0 1 2-2h2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M17 3h2a2 2 0 0 1 2 2v2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, -0.35, 1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M21 17v2a2 2 0 0 1-2 2h-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, 0.35, -1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path
        d="M7 21H5a2 2 0 0 1-2-2v-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: { x: [0, -0.35, 1.4, 0], y: [0, 0.35, -1.4, 0], transition: { duration: DUR, ...NUDGE } },
        }}
      />
      <motion.path d="M7 8h8" initial="normal" animate={controls} variants={line(0, 0.62)} />
      <motion.path d="M7 12h10" initial="normal" animate={controls} variants={line(0.06, 0.74)} />
      <motion.path d="M7 16h6" initial="normal" animate={controls} variants={line(0.12, 0.86)} />
    </svg>
  )
}

export const meta = {
  name: 'scan-text',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['find', 'scan', 'text'],
}

export default ScanTextIcon
