import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Wifi pen — the signal arrives. The pen holds still — it is the editor
 * sitting in the corner, not the signal, same reasoning as the dot in
 * wifi.tsx. All three arcs erase together, then redraw smallest (closest)
 * first, staggered, never a fade.
 * Base geometry: Lucide `wifi-pen` (ISC).
 */
const DUR = 1.1

export function WifiPenIcon({
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
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi pen'}
      {...hoverProps}
    >
      <path d="M21.378 16.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z" />
      <motion.path d="M8.5 16.429a5 5 0 0 1 3-1.406" initial="normal" animate={controls} variants={arc(0.12, 0.42)} />
      <motion.path d="M5 12.859a10 10 0 0 1 10.5-2.222" initial="normal" animate={controls} variants={arc(0.22, 0.55)} />
      <motion.path d="M2 8.82a15 15 0 0 1 20 0" initial="normal" animate={controls} variants={arc(0.32, 0.68)} />
    </svg>
  )
}

export const meta = {
  name: 'wifi-pen',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['signal', 'network', 'wifi', 'pen'],
}

export default WifiPenIcon
