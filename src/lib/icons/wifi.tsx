import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Wifi — the signal arrives. The dot holds still — it is the device, not
 * the signal. All three arcs erase together, then redraw bottom-up,
 * smallest (closest) first: the connection re-establishing arc by arc,
 * never a fade.
 * Base geometry: Lucide `wifi` (ISC).
 */
const DUR = 1.1

export function WifiIcon({
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
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi'}
      {...hoverProps}
    >
      <path d="M12 20h.01" />
      <motion.path d="M8.5 16.429a5 5 0 0 1 7 0" initial="normal" animate={controls} variants={arc(0.12, 0.42)} />
      <motion.path d="M5 12.859a10 10 0 0 1 14 0" initial="normal" animate={controls} variants={arc(0.22, 0.55)} />
      <motion.path d="M2 8.82a15 15 0 0 1 20 0" initial="normal" animate={controls} variants={arc(0.32, 0.68)} />
    </svg>
  )
}

export const meta = {
  name: 'wifi',
  gesture: 'the signal arrives',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['network', 'wireless', 'internet', 'signal'],
}

export default WifiIcon
