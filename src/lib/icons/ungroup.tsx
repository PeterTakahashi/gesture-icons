import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, settleBack } from '../core/easings'

/**
 * Ungroup — the two shapes part ways. A small wind-up drawing them toward
 * each other, then each rect NUDGEs out along its own diagonal past its
 * mark and settleBacks home — the same diagonal-nudge language as
 * maximize.tsx, run in reverse roles (the shapes separating rather than a
 * frame expanding), on one clock so the split reads as a single gesture.
 * Base geometry: Lucide `ungroup` (ISC).
 */
const DUR = 0.75
const D = 0.7071
const WIND = 0.6
const DRIVE = 2.4

export function UngroupIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ungroup'}
      {...hoverProps}
    >
      {/* bottom-right rect nudges further down-right */}
      <motion.rect
        x="11" y="14" width="10" height="7" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -WIND * D, DRIVE * D, 0],
            y: [0, -WIND * D, DRIVE * D, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
      {/* top-left rect nudges further up-left */}
      <motion.rect
        x="3" y="3" width="10" height="7" rx="2"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, WIND * D, -DRIVE * D, 0],
            y: [0, WIND * D, -DRIVE * D, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, settleBack, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'ungroup',
  gesture: 'the two shapes part ways',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'ungroup'],
}

export default UngroupIcon
