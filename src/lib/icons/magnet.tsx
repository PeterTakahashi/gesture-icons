import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Magnet — it pulls. The magnet nudges toward its own poles, and two tiny
 * filings draw themselves onto the pole tips on the same clock — the pull
 * shown by what it does, not a fade or a label.
 * Base geometry: Lucide `magnet` (ISC).
 */
const DUR = 0.95

export function MagnetIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const filing = (delay: number) => ({
    normal: { pathLength: 0.001, opacity: 0 },
    animate: {
      pathLength: [0.001, 0.001, 1, 1, 0.001],
      opacity: [0, 0, 1, 1, 0],
      transition: {
        duration: DUR,
        delay,
        pathLength: { times: [0, 0.3, 0.6, 0.82, 1], ease: [easeInOutCubic, easeOutExpo, 'linear', easeInOutCubic] },
        opacity: { times: [0, 0.29, 0.3, 0.9, 1], ease: 'linear' },
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'magnet'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.5, 1.2, 0],
            y: [0, -0.5, 1.2, 0],
            transition: { duration: DUR, times: [0, 0.24, 0.6, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m12 15 4 4" />
        <path d="M2.352 10.648a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.029-6.029a1 1 0 1 1 3 3l-6.029 6.029a1.205 1.205 0 0 0 0 1.704l2.296 2.296a1.205 1.205 0 0 0 1.704 0l6.365-6.367A1 1 0 0 0 8.716 4.282z" />
        <path d="m5 8 4 4" />
      </motion.g>
      {/* filings snapping onto the poles, drawn by length, never faded */}
      <motion.path d="M22 1.2 20.1 3.1" strokeWidth={strokeWidth * 0.75} initial="normal" animate={controls} variants={filing(0.08)} />
      <motion.path d="M2 13 3.9 11.1" strokeWidth={strokeWidth * 0.75} initial="normal" animate={controls} variants={filing(0.14)} />
    </svg>
  )
}

export const meta = {
  name: 'magnet',
  gesture: 'it pulls',
  family: 'rigid' as const,
  section: 'Tools',
  tags: ['attract', 'physics'],
}

export default MagnetIcon
