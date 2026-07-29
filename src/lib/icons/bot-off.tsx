import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Bot off — it shuts down. The slash DRAWs across (erase then pen-redraw,
 * never a fade — same trick as eye-off.tsx and mic-off.tsx) while, in the
 * gap where it's briefly erased, the bot gives ONE small defeated
 * sag/tilt about the bottom-center of its head (12px, 16px) and settles
 * back before the slash redraws over it.
 * Base geometry: Lucide `bot-off` (ISC).
 */
const DUR = 0.9

export function BotOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bot off'}
      {...hoverProps}
    >
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 0, 4, 0],
            y: [0, 0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 0.95], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M13.67 8H18a2 2 0 0 1 2 2v4.33" />
        <path d="M8 8H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 1.414-.586" />
        <path d="M9 13v2" />
        <path d="M9.67 4H12v2.33" />
      </motion.g>
      <motion.path
        d="M22 22 2 2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bot-off',
  gesture: 'it shuts down',
  family: 'draw-on' as const,
  section: 'Workspace',
  tags: ['disabled', 'off', 'bot'],
}

export default BotOffIcon
