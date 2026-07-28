import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Cat — it flicks an ear. Lucide draws both ears fused into one head
 * outline with no separate ear path to isolate, so the whole head carries
 * both beats on one pivot near the ear base: a quick flick first, then a
 * slower, larger tilt — noticed you, unimpressed.
 * Base geometry: Lucide `cat` (ISC).
 */
const DUR = 1.15

export function CatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cat'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -12, 0, 0, 4, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.24, 0.32, 0.7, 1],
              ease: [easeOutQuart, easeInOutCubic, 'linear', easeInOutCubic, easeInOutCubic],
            },
          },
        }}
      >
        <path d="M12 5c.67 0 1.35.09 2 .26 1.78-2 5.03-2.84 6.42-2.26 1.4.58-.42 7-.42 7 .57 1.07 1 2.24 1 3.44C21 17.9 16.97 21 12 21s-9-3-9-7.56c0-1.25.5-2.4 1-3.44 0 0-1.89-6.42-.5-7 1.39-.58 4.72.23 6.5 2.23A9.04 9.04 0 0 1 12 5Z" />
        <path d="M8 14v.5" />
        <path d="M16 14v.5" />
        <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cat',
  gesture: 'it flicks an ear',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['pet', 'kitten', 'animal'],
}

export default CatIcon
