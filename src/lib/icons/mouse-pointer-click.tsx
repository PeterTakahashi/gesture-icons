import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mouse pointer click — it does what it means. VARIANT(mouse-pointer): the
 * cursor NUDGEs down-right into its click, hard stop, settle back; the four
 * click sparks are dash-gated — they retract to nothing just before the
 * stop and flick back on (a hard snap, never a fade) exactly on the press
 * frame, then hold.
 * Base geometry: Lucide `mouse-pointer-click` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const DRIVE = 1.2
const WIND = 0.3
const SPARKS = ['M14 4.1 12 6', 'm5.1 8-2.9-.8', 'm6 12-1.9 2', 'M7.2 2.2 8 5.1']

export function MousePointerClickIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse pointer click'}
      {...hoverProps}
    >
      {SPARKS.map((d) => (
        <motion.path
          key={d}
          d={d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 1 },
            animate: {
              pathLength: [1, 1, 0.001, 0.001, 1, 1],
              transition: { duration: DUR, times: [0, 0.16, 0.18, 0.3, 0.32, 1], ease: 'linear' },
            },
          }}
        />
      ))}
      <motion.path
        d="M9.037 9.69a.498.498 0 0 1 .653-.653l11 4.5a.5.5 0 0 1-.074.949l-4.349 1.041a1 1 0 0 0-.74.739l-1.04 4.35a.5.5 0 0 1-.95.074z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            y: [0, -WIND * D, DRIVE * D, DRIVE * D, 0],
            transition: {
              duration: DUR,
              times: [0, 0.12, 0.32, 0.5, 0.85],
              ease: [easeInOutCubic, easeOutQuart, 'linear', settleBack],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'mouse-pointer-click',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['cursor', 'click', 'pointer', 'mouse'],
}

export default MousePointerClickIcon
