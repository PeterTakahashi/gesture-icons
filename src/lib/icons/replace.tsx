import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Replace — it does what it means. Depth swaps: the ghost corner marks
 * (the vacated slot) counter-nudge up and away as the arrow drives its
 * value down into the solid box below; the box takes a contact pop exactly
 * as the arrow arrives, never before — then everything settles back to
 * the resting glyph, on one shared clock.
 * Base geometry: Lucide `replace` (ISC).
 */
const DUR = 1.0

export function ReplaceIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'replace'}
      {...hoverProps}
    >
      {/* the ghost slot recedes as its value leaves */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, 0, 0.7, 0],
            y: [0, 0, -0.7, 0],
            transition: { duration: DUR, times: [0, 0.15, 0.55, 0.9], ease: ['linear', easeInOutCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M14 4a1 1 0 0 1 1-1" />
        <path d="M15 10a1 1 0 0 1-1-1" />
        <path d="M21 4a1 1 0 0 0-1-1" />
        <path d="M21 9a1 1 0 0 1-1 1" />
      </motion.g>
      {/* the value drops down into place */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 2.2, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m3 7 3 3 3-3" />
        <path d="M6 10V5a2 2 0 0 1 2-2h2" />
      </motion.g>
      {/* the target box takes the contact pop as the value arrives */}
      <motion.rect
        x="3" y="14" width="7" height="7" rx="1"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.12, 1],
            transition: { duration: DUR, times: [0, 0.5, 0.63, 0.9], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'replace',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['boolean', 'layers', 'combine', 'replace'],
}

export default ReplaceIcon
