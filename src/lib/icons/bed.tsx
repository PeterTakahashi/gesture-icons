import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Bed — it is turned down. The svg has no separate pillow shape, only the
 * divider line that marks it off from the rest of the frame — so that line
 * is the "pillow": it PRESSes (fluffed), and once it has settled the frame
 * around it (headboard, rail, floor) takes a small settle-down, as if the
 * whole bed had just taken the weight of being made ready.
 * Base geometry: Lucide `bed` (ISC).
 */
const DUR = 0.9

export function BedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bed'}
      {...hoverProps}
    >
      <motion.path
        d="M2 4v16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.76, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M2 8h18a2 2 0 0 1 2 2v10"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.76, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M2 17h20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.76, 1], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      {/* the pillow: the one part the svg draws as its own line, fluffed first */}
      <motion.path
        d="M6 8v9"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 0.85, 1.05, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.5, 0.72], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bed',
  gesture: 'it is turned down',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['sleep', 'furniture', 'hotel'],
}

export default BedIcon
