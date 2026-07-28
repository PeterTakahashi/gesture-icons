import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tag — it swings from its hole. The whole tag hangs and swings about the
 * punched hole near its top-left corner, each swing smaller than the last,
 * the way anything actually pinned at a single point decays.
 * Base geometry: Lucide `tag` (ISC).
 */
const DUR = 1.0

export function TagIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tag'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7.5px 7.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 9, -6, 3, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M12.586 2.586A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l6.58-6.58a2.426 2.426 0 0 0 0-3.42z" />
        <circle
          cx="7.5" cy="7.5" r=".5"
          fill={color === 'currentColor' ? 'currentColor' : color}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tag',
  gesture: 'it swings from its hole',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['label', 'price', 'category'],
}

export default TagIcon
