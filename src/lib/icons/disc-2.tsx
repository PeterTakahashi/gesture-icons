import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutQuart } from '../core/easings'

/**
 * Disc 2 — it turns. Deviation from the literal spec: this glyph is two
 * concentric circles plus a center dot sitting ON the rotation axis, so an
 * in-plane rotation is perfectly invisible at every frame — there is no
 * honest way to "spin" a shape with infinite rotational symmetry about its
 * own center. The honest alternative is a coin-flip: the disc squashes to
 * its edge and back twice on one clock (edge-on, face, edge-on, face) —
 * exactly one revolution seen from the side — landing back on scaleX 1.
 * Base geometry: Lucide `disc-2` (ISC).
 */
const DUR = 1.2

export function Disc2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'disc 2'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleX: 1 },
          animate: {
            scaleX: [1, 0.15, 1, 0.15, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutQuart },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="4" />
        <path d="M12 12h.01" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'disc-2',
  gesture: 'it turns',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['loading', 'spinner', 'wait', 'disc'],
}

export default Disc2Icon
