import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart, easeOutQuart } from '../core/easings'

/**
 * Copy — the sheet duplicates. The front sheet peels up and to the left,
 * settling onto the back sheet's position, then returns to its own spot —
 * the beat of a copy being made and set back down. The back sheet never
 * moves.
 * Base geometry: Lucide `copy` (ISC).
 */
const DUR = 1.0

export function CopyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copy'}
      {...hoverProps}
    >
      <motion.rect
        width="14" height="14" x="8" y="8" rx="2" ry="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -3.2, -3.2, 0],
            y: [0, -3.2, -3.2, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 1], ease: [easeInOutQuart, 'linear', easeOutQuart] },
          },
        }}
      />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  )
}

export const meta = {
  name: 'copy',
  gesture: 'the sheet duplicates',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['duplicate', 'clone', 'paste'],
}

export default CopyIcon
