import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Unfold vertical — it opens outward. The two arm-and-arrow assemblies
 * NUDGE away from the center hinge: a small wind-up inward, a drive out
 * past the mark, settleBack home — one clock so both sides read as a
 * single unfold. The dashed hinge line across the middle is the rail the
 * arms unfold along, so it stays put.
 * Base geometry: Lucide `unfold-vertical` (ISC).
 */
const DUR = 0.75
const WIND = 0.6
const DRIVE = 2.4

export function UnfoldVerticalIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'unfold vertical'}
      {...hoverProps}
    >
      {/* static hinge rail */}
      <path d="M4 12H2" />
      <path d="M10 12H8" />
      <path d="M16 12h-2" />
      <path d="M22 12h-2" />
      {/* bottom arm + arrow, nudges further down */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -WIND, DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 22v-6" />
        <path d="m15 19-3 3-3-3" />
      </motion.g>
      {/* top arm + arrow, nudges further up */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, WIND, -DRIVE, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="M12 8V2" />
        <path d="m15 5-3-3-3 3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'unfold-vertical',
  gesture: 'it opens outward',
  family: 'rigid' as const,
  section: 'Arrows',
  tags: ['layout', 'arrange', 'unfold', 'vertical'],
}

export default UnfoldVerticalIcon
