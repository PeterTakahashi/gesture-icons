import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Unfold horizontal — it opens outward. The two arm-and-arrow assemblies
 * NUDGE away from the center hinge: a small wind-up inward, a drive out
 * past the mark, settleBack home — one clock so both sides read as a
 * single unfold rather than two separate slides. The dashed hinge line
 * down the middle is the rail the arms unfold along, so it stays put.
 * Base geometry: Lucide `unfold-horizontal` (ISC).
 */
const DUR = 0.75
const WIND = 0.6
const DRIVE = 2.4

export function UnfoldHorizontalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'unfold horizontal'}
      {...hoverProps}
    >
      {/* static hinge rail */}
      <path d="M12 2v2" />
      <path d="M12 8v2" />
      <path d="M12 14v2" />
      <path d="M12 20v2" />
      {/* right arm + arrow, nudges further right */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -WIND, DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M16 12h6" />
        <path d="m19 15 3-3-3-3" />
      </motion.g>
      {/* left arm + arrow, nudges further left */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, WIND, -DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M8 12H2" />
        <path d="m5 9-3 3 3 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'unfold-horizontal',
  gesture: 'it opens outward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['layout', 'arrange', 'unfold', 'horizontal'],
}

export default UnfoldHorizontalIcon
