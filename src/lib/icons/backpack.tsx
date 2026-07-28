import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Backpack — it is shouldered. The whole pack lifts and swings up onto one
 * shoulder strap — hinged where the strap meets the top — settles down
 * square, and the top strap gives a small flex as the load takes hold.
 * Base geometry: Lucide `backpack` (ISC).
 */
const DUR = 1.0

export function BackpackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'backpack'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '11px 4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2, -2, 0],
            rotate: [0, -3, -3, 0],
            transition: { duration: DUR, times: [0, 0.34, 0.62, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M4 10a4 4 0 0 1 4-4h8a4 4 0 0 1 4 4v10a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2z" />
        <path d="M8 10h8" />
        <path d="M8 18h8" />
        <path d="M8 22v-6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v6" />
        <motion.path
          d="M9 6V4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2"
          style={{ transformBox: 'view-box', transformOrigin: '11px 4px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { scaleX: 1 },
            animate: {
              scaleX: [1, 1, 1.03, 1],
              transition: { duration: DUR, times: [0, 0.62, 0.82, 1], ease: easeOutQuart },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'backpack',
  gesture: 'it is shouldered',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['school', 'travel', 'hike'],
}

export default BackpackIcon
