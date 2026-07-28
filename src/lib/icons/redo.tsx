import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Redo — it does the step again. The whole hook turns about the center of
 * its own arc, past the angle it needs, then eases back home — one repeated
 * beat, not a settle onto a new resting picture (the arrowhead's gap keeps
 * 40° from reading as identical to 0°, so it has to come all the way back).
 * Base geometry: Lucide `redo-2` (ISC).
 */
const DUR = 0.9

export function RedoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'redo'}
      {...hoverProps}
    >
      {/* arc center (9.5, 14.5) — derived from the two 5.5-radius sweeps */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9.5px 14.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 42, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="m15 14 5-5-5-5" />
        <path d="M20 9H9.5A5.5 5.5 0 0 0 4 14.5A5.5 5.5 0 0 0 9.5 20H13" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'redo',
  gesture: 'it does it again',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['again', 'forward', 'history'],
}

export default RedoIcon
