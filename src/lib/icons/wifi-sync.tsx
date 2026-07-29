import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Wifi sync — it draws itself. The dot holds still. The two remaining wifi
 * arcs erase together and redraw small-to-large, the signal returning;
 * then the little sync glyph in the corner erases and pen-redraws last,
 * as the accent that completes the picture — the connection syncing back
 * up, never a fade.
 * Base geometry: Lucide `wifi-sync` (ISC).
 */
const DUR = 1.15

export function WifiSyncIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const arc = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.12, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  const sync = (delay: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.36, 0.46, redrawEnd],
        ease: [easeInCubic, 'linear', pen],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi sync'}
      {...hoverProps}
    >
      <path d="M8.5 16.429h.01" />
      <motion.path d="M5 12.86a10 10 0 0 1 3-2.032" initial="normal" animate={controls} variants={arc(0.14, 0.42)} />
      <motion.path d="M2 8.82a15 15 0 0 1 20 0" initial="normal" animate={controls} variants={arc(0.24, 0.55)} />
      <motion.path d="M11.965 10.105v4L13.5 12.5a5 5 0 0 1 8 1.5" initial="normal" animate={controls} variants={sync(0, 0.72)} />
      <motion.path d="M11.965 14.105h4" initial="normal" animate={controls} variants={sync(0.03, 0.75)} />
      <motion.path d="M17.965 18.105h4L20.43 19.71a5 5 0 0 1-8-1.5" initial="normal" animate={controls} variants={sync(0.06, 0.78)} />
      <motion.path d="M21.965 22.105v-4" initial="normal" animate={controls} variants={sync(0.09, 0.81)} />
    </svg>
  )
}

export const meta = {
  name: 'wifi-sync',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['signal', 'network', 'wifi', 'sync'],
}

export default WifiSyncIcon
