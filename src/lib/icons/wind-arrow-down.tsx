import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutExpo, easeOutQuart, settleBack } from '../core/easings'

/**
 * Wind arrow down — the gust lands. VARIANT(wind): the two stream lines
 * drain away and write themselves back on with an easeOutExpo curl, top
 * line first; as they finish, the arrow itself NUDGEs downward and settles
 * — the gust arriving where the arrow points.
 * Base geometry: Lucide `wind-arrow-down` (ISC).
 */
const DUR = 1.0

export function WindArrowDownIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'wind arrow down'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, -0.6, 1.2, 0],
            transition: {
              duration: DUR,
              times: [0, 0.55, 0.65, 0.82, 1],
              ease: ['linear', easeInOutCubic, easeOutQuart, settleBack],
            },
          },
        }}
      >
        <path d="M10 2v8" />
        <path d="m6 6 4 4 4-4" />
      </motion.g>
      <motion.path
        d="M12.8 21.6A2 2 0 1 0 14 18H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: 0.55, times: [0, 0.32, 0.42, 1], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
      <motion.path
        d="M17.5 10a2.5 2.5 0 1 1 2 4H2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: 0.55, delay: 0.06, times: [0, 0.32, 0.42, 1], ease: [easeInCubic, 'linear', easeOutExpo] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'wind-arrow-down',
  gesture: 'the gust lands',
  family: 'draw-on' as const,
  section: 'Nature',
  tags: ['weather', 'wind', 'arrow', 'down'],
}

export default WindArrowDownIcon
