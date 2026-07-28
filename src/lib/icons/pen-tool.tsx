import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Pen tool — it places an anchor. The nib PRESSes toward its point — a
 * short push along the line toward the anchor it's placing, then a release —
 * and the anchor itself POPs past its size on the exact contact frame, the
 * way a vector anchor snaps into being under the nib.
 * Base geometry: Lucide `pen-tool` (ISC).
 */
const DUR = 0.7
const D = 0.7071

export function PenToolIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pen tool'}
      {...hoverProps}
    >
      {/* nib pushes toward the anchor at (11,11), then releases */}
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            x: [0, -1.2 * D, 0],
            y: [0, -1.2 * D, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.75], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M15.707 21.293a1 1 0 0 1-1.414 0l-1.586-1.586a1 1 0 0 1 0-1.414l5.586-5.586a1 1 0 0 1 1.414 0l1.586 1.586a1 1 0 0 1 0 1.414z" />
        <path d="m18 13-1.375-6.874a1 1 0 0 0-.746-.776L3.235 2.028a1 1 0 0 0-1.207 1.207L5.35 15.879a1 1 0 0 0 .776.746L13 18" />
        <path d="m2.3 2.3 7.286 7.286" />
      </motion.g>
      {/* anchor pops on the contact frame */}
      <motion.circle
        cx="11" cy="11" r="2"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.35, 0.5, 0.8], ease: ['linear', settleBack, easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'pen-tool',
  gesture: 'it places an anchor',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['vector', 'design', 'bezier'],
}

export default PenToolIcon
