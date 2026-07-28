import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Radio — it tunes in. Both wave pairs erase and re-emit outward together
 * — inner pair first, outer pair a beat behind — and once the signal is
 * back, the whole body gives one small shiver as it locks onto the
 * station.
 * Base geometry: Lucide `radio` (ISC).
 */
const DUR = 1.0

export function RadioIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const wave = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: {
        duration: DUR,
        times: [0, 0.15, redrawStart, redrawEnd],
        ease: [easeInCubic, 'linear', easeOutQuart],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'radio'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, -1.5, 1, 0],
            transition: { duration: DUR, times: [0, 0.78, 0.86, 0.93, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="12" r="2" />
        <motion.path d="M7.753 16.239a6 6 0 0 1 0-8.478" initial="normal" animate={controls} variants={wave(0.3, 0.55)} />
        <motion.path d="M16.247 7.761a6 6 0 0 1 0 8.478" initial="normal" animate={controls} variants={wave(0.3, 0.55)} />
        <motion.path d="M4.925 19.067a10 10 0 0 1 0-14.134" initial="normal" animate={controls} variants={wave(0.42, 0.72)} />
        <motion.path d="M19.075 4.933a10 10 0 0 1 0 14.134" initial="normal" animate={controls} variants={wave(0.42, 0.72)} />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'radio',
  gesture: 'it tunes in',
  family: 'draw-on' as const,
  section: 'Communication',
  tags: ['broadcast', 'fm', 'waves'],
}

export default RadioIcon
