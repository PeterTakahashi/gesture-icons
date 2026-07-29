import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Info — it clears its throat. The dot dips and pops back past its size
 * before settling, then the stem gives a small nod once the dot has
 * finished — ahem, a word.
 * Base geometry: Lucide `info` (ISC).
 */
const DUR = 0.9

export function InfoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'info'}
      {...hoverProps}
    >
      <circle cx="12" cy="12" r="10" />
      <motion.path
        d="M12 16v-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.75, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M12 8h.01"
        style={{ transformBox: 'view-box', transformOrigin: '12px 8px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.6, 1.35, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.42, 0.6], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'info',
  gesture: 'it clears its throat',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['information', 'about', 'help', 'info'],
}

export default InfoIcon
