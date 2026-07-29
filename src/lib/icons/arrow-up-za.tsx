import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Arrow up Z-A — it sorts descending. The arrow NUDGEs up on its own clock;
 * the "Z" and the "a" cascade upward behind it, 7% staggered, in the order
 * the sort reads top to bottom: Z first, then a.
 * Base geometry: Lucide `arrow-up-za` (ISC).
 */
const DUR = 0.75
const DRIVE_Y = 2
const WIND_Y = 0.6
const DRIVE_Y_MARK = 1.3
const WIND_Y_MARK = 0.35
const STAGGER = 0.07 * DUR

const markVariants = (delay: number) => ({
  normal: { y: 0 },
  animate: {
    y: [0, WIND_Y_MARK, -DRIVE_Y_MARK, 0],
    transition: { duration: DUR, delay, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
  },
})

export function ArrowUpZaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'arrow up za'}
      {...hoverProps}
    >
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
      <motion.path d="M15 4h5l-5 6h5" initial="normal" animate={controls} variants={markVariants(0)} />
      <motion.g initial="normal" animate={controls} variants={markVariants(STAGGER)}>
        <path d="M15 20v-3.5a2.5 2.5 0 0 1 5 0V20" />
        <path d="M20 18h-5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'arrow-up-za',
  gesture: 'it sorts descending',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['arrow', 'sort'],
}

export default ArrowUpZaIcon
