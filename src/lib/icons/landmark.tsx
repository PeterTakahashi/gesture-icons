import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Landmark — the institution stands. The pediment presses down onto the
 * columns, which each take a small compression dip in sequence, left to
 * right — the layer above hits the next one down, 3% later each time,
 * weight settling on marble. The ground line never moves.
 * Base geometry: Lucide `landmark` (ISC).
 */
const DUR = 0.9
const COLUMNS = [
  { d: 'M6 18v-7', startAt: 0.34 },
  { d: 'M10 18v-7', startAt: 0.37 },
  { d: 'M14 18v-7', startAt: 0.4 },
  { d: 'M18 18v-7', startAt: 0.43 },
]

export function LandmarkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const column = (startAt: number): Variants => ({
    normal: { y: 0 },
    animate: {
      y: [0, 0.3, 0],
      transition: { duration: DUR, times: [0, startAt, startAt + 0.28], ease: ['linear', settleBack] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'landmark'}
      {...hoverProps}
    >
      <motion.path
        d="M11.119 2.205a2 2 0 0 1 1.762 0l7.84 3.846A.5.5 0 0 1 20.5 7h-17a.5.5 0 0 1-.22-.949z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.55], ease: [easeInCubic, settleBack] },
          },
        }}
      />
      {COLUMNS.map((c) => (
        <motion.path key={c.d} d={c.d} initial="normal" animate={controls} variants={column(c.startAt)} />
      ))}
      <path d="M3 22h18" />
    </svg>
  )
}

export const meta = {
  name: 'landmark',
  gesture: 'the institution stands',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['bank', 'government', 'classic'],
}

export default LandmarkIcon
