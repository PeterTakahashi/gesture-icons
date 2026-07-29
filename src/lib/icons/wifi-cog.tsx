import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Wifi cog — the signal arrives. The cog holds still — it is the managed
 * device, not the signal, same reasoning as the dot in wifi.tsx. All three
 * arcs erase together, then redraw smallest (closest) first, staggered
 * ~90ms apart, never a fade.
 * Base geometry: Lucide `wifi-cog` (ISC).
 */
const DUR = 1.1

export function WifiCogIcon({
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
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wifi cog'}
      {...hoverProps}
    >
      <path d="m14.305 19.53.923-.382" />
      <path d="m15.228 16.852-.923-.383" />
      <path d="m16.852 15.228-.383-.923" />
      <path d="m16.852 20.772-.383.924" />
      <path d="m19.148 15.228.383-.923" />
      <path d="m19.53 21.696-.382-.924" />
      <path d="m20.772 16.852.924-.383" />
      <path d="m20.772 19.148.924.383" />
      <circle cx="18" cy="18" r="3" />
      <motion.path d="M8.5 15.429a5 5 0 0 1 2.413-1.31" initial="normal" animate={controls} variants={arc(0.12, 0.42)} />
      <motion.path d="M5 11.858a10 10 0 0 1 11.5-1.785" initial="normal" animate={controls} variants={arc(0.22, 0.55)} />
      <motion.path d="M2 7.82a15 15 0 0 1 20 0" initial="normal" animate={controls} variants={arc(0.32, 0.68)} />
    </svg>
  )
}

export const meta = {
  name: 'wifi-cog',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['signal', 'network', 'wifi', 'cog'],
}

export default WifiCogIcon
