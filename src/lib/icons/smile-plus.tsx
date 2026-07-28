import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen, settleBack } from '../core/easings'

/**
 * Smile plus — one more smile. VARIANT(smile): the mouth erases and
 * pen-redraws itself the same way smile.tsx does, the eyes pop just before
 * it finishes — and once the face has set, the plus badge pops in,
 * overshoots, and settles, reading as a reaction being added.
 * Base geometry: Lucide `smile-plus` (ISC).
 */
const DUR = 1.05
const EYES = [9, 15]

export function SmilePlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'smile plus'}
      {...hoverProps}
    >
      <path d="M22 11v1a10 10 0 1 1-9-10" />
      <motion.path
        d="M8 14s1.5 2 4 2 4-2 4-2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0, 0, 1],
            transition: { duration: DUR, times: [0, 0.16, 0.24, 0.75], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
      {EYES.map((cx, i) => (
        <motion.line
          key={cx}
          x1={cx} x2={cx + 0.01} y1="9" y2="9"
          style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scale: 1 },
            animate: {
              scale: [1, 1, 1.25, 1, 1],
              transition: {
                duration: DUR,
                delay: i * 0.04,
                times: [0, 0.55, 0.66, 0.78, 0.9],
                ease: ['linear', settleBack, easeOutQuart, 'linear'],
              },
            },
          }}
        />
      ))}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.6, 0.72, 0.9, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M16 5h6" />
        <path d="M19 2v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'smile-plus',
  gesture: 'one more smile',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['add', 'react', 'face'],
}

export default SmilePlusIcon
