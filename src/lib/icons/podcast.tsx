import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Podcast — on the air. The mic capsule pulses twice, scale never
 * opacity, while the four signal arcs around it EMIT once — inner pair
 * first, outer pair a beat behind — live now. The stem and base never
 * move.
 * Base geometry: Lucide `podcast` (ISC).
 */
const DUR = 1.0

export function PodcastIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const arc = (redrawStart: number, redrawEnd: number): Variants => ({
    normal: { pathLength: 1 },
    animate: {
      pathLength: [1, 0.001, 0.001, 1],
      transition: { duration: DUR, times: [0, 0.15, redrawStart, redrawEnd], ease: [easeInCubic, 'linear', easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'podcast'}
      {...hoverProps}
    >
      <path d="M12 17v4" />
      <motion.path d="M6 11a6 6 0 0 1 3-5.197" initial="normal" animate={controls} variants={arc(0.32, 0.58)} />
      <motion.path d="M18 11a6 6 0 0 0-3-5.197" initial="normal" animate={controls} variants={arc(0.32, 0.58)} />
      <motion.path d="M2 11a10 10 0 0 1 5-8.662" initial="normal" animate={controls} variants={arc(0.42, 0.72)} />
      <motion.path d="M22 11a10 10 0 0 0-5-8.662" initial="normal" animate={controls} variants={arc(0.42, 0.72)} />
      <path d="M9 21h6" />
      <motion.rect
        x="10" y="9" width="4" height="8" rx="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.3, 1, 1, 1.3, 1, 1],
            transition: {
              duration: DUR,
              times: [0, 0.15, 0.3, 0.5, 0.65, 0.8, 1],
              ease: [settleBack, easeOutQuart, 'linear', settleBack, easeOutQuart, 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'podcast',
  gesture: 'on the air',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['audio', 'show', 'broadcast'],
}

export default PodcastIcon
