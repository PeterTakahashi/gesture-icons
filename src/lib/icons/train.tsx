import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuint, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Train — it pulls in. It departs right at speed, is repositioned to the
 * far side while genuinely off-frame, and pulls IN from the left on a long
 * arrival curve — the readable beat is the arrival, not the exit, so it
 * gets most of the clock. A tiny settle dip as the wheels stop.
 * Base geometry: Lucide `train-front` (ISC).
 */
const DUR = 1.2

export function TrainIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'train'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 26, -26, 0],
            y: [0, 0, 0.6, 0],
            transition: {
              duration: DUR,
              x: { times: [0, 0.15, 0.16, 1], ease: [easeInCubic, 'linear', easeOutQuint] },
              y: { times: [0, 0.88, 0.94, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
            },
          },
        }}
      >
        <path d="M8 3.1V7a4 4 0 0 0 8 0V3.1" />
        <path d="m9 15-1-1" />
        <path d="m15 15 1-1" />
        <path d="M9 19c-2.8 0-5-2.2-5-5v-4a8 8 0 0 1 16 0v4c0 2.8-2.2 5-5 5Z" />
        <path d="m8 19-2 3" />
        <path d="m16 19 2 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'train',
  gesture: 'it pulls in',
  family: 'travel' as const,
  section: 'Transport',
  tags: ['railway', 'metro', 'subway', 'transit'],
}

export default TrainIcon
