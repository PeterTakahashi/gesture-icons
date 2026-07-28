import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { pen, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Mic — it picks up the level. The capsule leans into itself a hair, and
 * two small level arcs flank it and flick on then off — drawn by stroke
 * length, never a fade, hidden at rest via strokeDashoffset 1.02 (see
 * muscle.tsx's crease2 for the same trick).
 * Base geometry: Lucide `mic` (ISC).
 */
const DUR = 0.95

export function MicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const levelArc = (delay: number): Variants => ({
    normal: { strokeDashoffset: 1.02 },
    animate: {
      strokeDashoffset: [1.02, 1.02, 0, 0, 1.02, 1.02],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.28, 0.44, 0.62, 0.78, 0.92],
        ease: ['linear', pen, 'linear', easeInOutCubic, 'linear'],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mic'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.4, 1], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 19v3" />
        <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
        <rect x="9" y="2" width="6" height="13" rx="3" />
      </motion.g>
      {/* level arcs: flank the mic, hidden at rest, flick on as it picks up sound */}
      <motion.path
        d="M4.5 8.5a4 4 0 0 0 0 7"
        pathLength={1}
        strokeDasharray="1.02"
        initial="normal"
        animate={controls}
        variants={levelArc(0)}
      />
      <motion.path
        d="M19.5 8.5a4 4 0 0 1 0 7"
        pathLength={1}
        strokeDasharray="1.02"
        initial="normal"
        animate={controls}
        variants={levelArc(0.08)}
      />
    </svg>
  )
}

export const meta = {
  name: 'mic',
  gesture: 'it picks up the level',
  family: 'secondary' as const,
  section: 'Communication',
  tags: ['microphone', 'voice', 'record', 'audio'],
}

export default MicIcon
