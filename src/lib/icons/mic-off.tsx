import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Mic off — the mic is muted. The slash DRAWs across (erase then
 * pen-redraw, never a fade) while the mic body sags on the hinge where
 * it meets its stand. The stand itself never moves.
 * Base geometry: Lucide `mic-off` (ISC).
 */
const DUR = 0.9

export function MicOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mic off'}
      {...hoverProps}
    >
      <path d="M12 19v3" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 2.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M15 9.34V5a3 3 0 0 0-5.68-1.33" />
        <path d="M16.95 16.95A7 7 0 0 1 5 12v-2" />
        <path d="M18.89 13.23A7 7 0 0 0 19 12v-2" />
        <path d="M9 9v3a3 3 0 0 0 5.12 2.12" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.85], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mic-off',
  gesture: 'the mic is muted',
  family: 'draw-on' as const,
  section: 'Media',
  tags: ['mute', 'silent'],
}

export default MicOffIcon
