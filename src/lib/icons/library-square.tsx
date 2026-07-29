import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Library square — it does what it means. VARIANT(library-big): the frame
 * holds still, the two straight spines counter-nudge left 0.8 while the
 * tilted spine nudges further right 1.5 along the stack axis, then both
 * settle home.
 * Base geometry: Lucide `library-square` (ISC).
 */
const DUR = 0.9

export function LibrarySquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'library square'}
      {...hoverProps}
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.8, -0.8, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M7 7v10" />
        <path d="M11 7v10" />
      </motion.g>
      <motion.path
        d="m15 7 2 10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, 1.5, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'library-square',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['collection', 'stack', 'library', 'square'],
}

export default LibrarySquareIcon
