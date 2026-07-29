import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Separator vertical — it does what it means. The two grip chevrons are the
 * part a hand actually drags: each NUDGEs further away from the divider
 * along the horizontal axis it already points — a small wind-up toward the
 * line, a drive out past the mark, a settleBack home. The divider itself
 * is the static rail; it never moves.
 * Base geometry: Lucide `separator-vertical` (ISC).
 */
const DUR = 0.85

export function SeparatorVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'separator vertical'}
      {...hoverProps}
    >
      <path d="M12 3v18" />
      <motion.path
        d="m16 16 4-4-4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.6, 1.4, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="m8 8-4 4 4 4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 0.6, -1.4, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'separator-vertical',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['layout', 'arrange', 'separator', 'vertical'],
}

export default SeparatorVerticalIcon
