import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Utensils — ready to eat. The fork and knife lift a hair and nudge toward
 * each other, then come back down and apart — set down at the place
 * setting, not mid-slide.
 * Base geometry: Lucide `utensils` (ISC).
 */
const DUR = 0.8

export function UtensilsIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'utensils'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -0.4, 1, 0],
            y: [0, -0.5, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
        <path d="M7 2v20" />
      </motion.g>
      <motion.path
        d="M21 15V2a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0.4, -1, 0],
            y: [0, -0.5, -0.5, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.6, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'utensils',
  gesture: 'ready to eat',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['cutlery', 'restaurant'],
}

export default UtensilsIcon
