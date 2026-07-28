import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Person standing — they stretch tall. The whole figure scales up from the
 * feet (the true ground contact), while the arms — one fused V-shaped path
 * in this glyph, so it can't split into a left/right lift — rock gently
 * about their own midpoint, reading as the reach of a stretch.
 * Base geometry: Lucide `person-standing` (ISC).
 */
const DUR = 0.9

export function PersonStandingIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'person standing'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      >
        <circle cx="12" cy="5" r="1" />
        <path d="m9 20 3-6 3 6" />
        <motion.path
          d="m6 8 6 2 6-2"
          style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, -4, 4, 0],
              transition: { duration: DUR, times: [0, 0.33, 0.66, 1], ease: easeInOutCubic },
            },
          }}
        />
        <path d="M12 10v4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'person-standing',
  gesture: 'they stretch tall',
  family: 'rigid' as const,
  section: 'People & emotion',
  tags: ['human', 'figure'],
}

export default PersonStandingIcon
