import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Train track — the rails hum. The two long rails never move; the five
 * sleepers nudge down a hair in sequence, left to right, 5% of the beat
 * apart — a train passing somewhere down the line, felt through the ties.
 * Base geometry: Lucide `train-track` (ISC).
 */
const DUR = 0.8
const STEP = DUR * 0.05

const TIES = ['m2 14 8 8', 'm5 11 8 8', 'm8 8 8 8', 'm11 5 8 8', 'm14 2 8 8']

export function TrainTrackIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'train track'}
      {...hoverProps}
    >
      <path d="M2 17 17 2" />
      {TIES.map((d, i) => (
        <motion.path
          key={d}
          d={d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              y: [0, 0.8, 0],
              transition: { duration: DUR, delay: i * STEP, times: [0, 0.5, 1], ease: easeInOutCubic },
            },
          }}
        />
      ))}
      <path d="M7 22 22 7" />
    </svg>
  )
}

export const meta = {
  name: 'train-track',
  gesture: 'the rails hum',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['railway', 'journey', 'train', 'track'],
}

export default TrainTrackIcon
