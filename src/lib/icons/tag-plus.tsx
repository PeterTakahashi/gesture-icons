import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Tag plus — one more is added. The plus mark dips to nothing and overshoots
 * back, the same pop as user-plus.tsx, while the tag body takes a half-unit
 * dip right on the pop frame — the small give of something new landing on
 * the pile — before settling flat again.
 * Base geometry: Lucide `tag-plus` (ISC).
 */
const DUR = 0.9

export function TagPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tag plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.58, 0.85], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.426 2.426 0 0 0 3.42 0l1.79-1.79" />
        <circle cx="7.5" cy="7.5" r=".5" fill={color === 'currentColor' ? 'currentColor' : color} />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M16 13h6" />
        <path d="M19 10v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tag-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['add', 'new', 'tag', 'plus'],
}

export default TagPlusIcon
