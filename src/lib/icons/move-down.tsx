import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Move down — it urges downward. A wind-up up then a drive down past the
 * mark before it settles home (arrow-up.tsx's beat, mirrored); the
 * chevron head runs slightly ahead of the shaft the whole beat.
 * Base geometry: Lucide `move-down` (ISC).
 */
const DUR = 0.75

export function MoveDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'move down'}
      {...hoverProps}
    >
      <motion.path
        d="M8 18L12 22L16 18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.59, 0.97], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.path
        d="M12 2V22"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.5, 3, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.62, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'move-down',
  gesture: 'it urges downward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['down', 'move'],
}

export default MoveDownIcon
