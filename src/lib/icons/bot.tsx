import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bot — it boots up. Both eyes hard-blink once together — no fade, a
 * true binary step — then the whole head tilts a few degrees about its own
 * center (12px,14px, the rect's own midpoint): hello, human. The antenna
 * carries no dot in Lucide's glyph, so its "pop" is an honest addition — a
 * tiny signal light at the antenna tip, hidden by scale at rest, that pops
 * once right at the tilt's peak and is gone again before the head returns.
 * Base geometry: Lucide `bot` (ISC).
 */
const DUR = 1.1

export function BotIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const eye = {
    normal: { opacity: 1 },
    animate: {
      opacity: [1, 1, 0, 0, 1, 1],
      transition: { duration: DUR, times: [0, 0.08, 0.09, 0.2, 0.21, 0.3], ease: 'linear' as const },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bot'}
      {...hoverProps}
    >
      <path d="M2 14h2" />
      <path d="M20 14h2" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 0, 3, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <motion.path d="M15 13v2" initial="normal" animate={controls} variants={eye} />
        <motion.path d="M9 13v2" initial="normal" animate={controls} variants={eye} />
        <motion.circle
          cx="8" cy="4" r="1"
          fill={color}
          stroke="none"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 0.001 },
            animate: {
              scale: [0.001, 0.001, 1.3, 1, 1, 0.001],
              transition: {
                duration: DUR,
                times: [0, 0.55, 0.66, 0.75, 0.9, 1],
                ease: ['linear', settleBack, easeOutQuart, 'linear', 'linear'],
              },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'bot',
  gesture: 'it boots up',
  family: 'secondary' as const,
  section: 'Workspace',
  tags: ['robot', 'ai', 'assistant'],
}

export default BotIcon
