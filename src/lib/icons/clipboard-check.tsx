import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Clipboard check — the check lands. The tick un-draws, waits a beat, then
 * a pen writes it back on — short stroke first, easing into the stop. The
 * clipboard takes a small dip exactly on the frame the tick finishes,
 * because that is the moment the mark actually lands.
 * Base geometry: Lucide `clipboard-check` (ISC).
 */
const DUR = 1.0

export function ClipboardCheckIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard check'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.8, 0.88, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </motion.g>
      <motion.path
        d="m9 14 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clipboard-check',
  gesture: 'the check lands',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['done', 'task', 'todo', 'verified'],
}

export default ClipboardCheckIcon
