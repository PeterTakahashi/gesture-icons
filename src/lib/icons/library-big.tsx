import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Library big — it does what it means. The standing book (the rect and its
 * spine line) counter-nudges left 0.8 while the tilted book leaning against
 * it nudges further right 1.5 along the same stack axis, both holding a
 * beat then settling home — plurality shown by the deck shuffling once.
 * Base geometry: Lucide `library-big` (ISC).
 */
const DUR = 0.9

export function LibraryBigIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'library big'}
      {...hoverProps}
    >
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
        <rect width="8" height="18" x="3" y="3" rx="1" />
        <path d="M7 3v18" />
      </motion.g>
      <motion.path
        d="M20.4 18.9c.2.5-.1 1.1-.6 1.3l-1.9.7c-.5.2-1.1-.1-1.3-.6L11.1 5.1c-.2-.5.1-1.1.6-1.3l1.9-.7c.5-.2 1.1.1 1.3.6Z"
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
  name: 'library-big',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['collection', 'stack', 'library', 'big'],
}

export default LibraryBigIcon
