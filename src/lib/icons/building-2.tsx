import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Building 2 — the tower stands taller. Everything stretches scaleY about
 * the base (the ground edge, which is the fixed pivot and never itself
 * moves) — the tall tower body leads the stretch by 3% of the beat, the wing,
 * windows and door follow fractionally behind: growth, not a rigid jump.
 * Base geometry: Lucide `building-2` (ISC).
 */
const DUR = 0.9

export function Building2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const stretch = (times: [number, number, number]): Variants => ({
    normal: { scaleY: 1 },
    animate: {
      scaleY: [1, 1.03, 1],
      transition: { duration: DUR, times, ease: easeInOutCubic },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'building 2'}
      {...hoverProps}
    >
      {/* the tallest part leads the stretch by 3% */}
      <motion.path
        d="M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={stretch([0, 0.27, 0.97])}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={stretch([0, 0.3, 1])}
      >
        <path d="M10 12h4" />
        <path d="M10 8h4" />
        <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
        <path d="M6 10H4a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'building-2',
  gesture: 'the tower stands taller',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['office', 'corporate', 'skyscraper'],
}

export default Building2Icon
