import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Sort ascending — it sorts. The three bars NUDGE right in sequence,
 * shortest first, each 8% behind the last — a quick ripple settling into
 * order — while the arrow NUDGEs up on the base clock, the anchor the bars
 * ripple away from.
 * Base geometry: Lucide `arrow-up-narrow-wide` (ISC).
 */
const DUR = 0.75
const DRIVE_X = 1.5
const WIND_X = 0.3
const DRIVE_Y = 2
const WIND_Y = 0.6
const STAGGER = 0.08 * DUR

const barVariants = (delay: number) => ({
  normal: { x: 0 },
  animate: {
    x: [0, -WIND_X, DRIVE_X, 0],
    transition: { duration: DUR, delay, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
  },
})

export function SortAscIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sort asc'}
      {...hoverProps}
    >
      {/* arrow nudges up, on the base clock */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, WIND_Y, -DRIVE_Y, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m3 8 4-4 4 4" />
        <path d="M7 4v16" />
      </motion.g>
      {/* shortest bar first */}
      <motion.path d="M11 12h4" initial="normal" animate={controls} variants={barVariants(0)} />
      <motion.path d="M11 16h7" initial="normal" animate={controls} variants={barVariants(STAGGER)} />
      <motion.path d="M11 20h10" initial="normal" animate={controls} variants={barVariants(STAGGER * 2)} />
    </svg>
  )
}

export const meta = {
  name: 'sort-asc',
  gesture: 'it sorts ascending',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['sort', 'order'],
}

export default SortAscIcon
