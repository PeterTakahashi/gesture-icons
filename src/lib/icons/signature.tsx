import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Signature — it writes itself. VARIANT(pencil): the stroke tips about its
 * own tip — the flourish's last point (21, 17) — with the same small
 * wind-up rotate and x/y jot pencil.tsx uses. The underline is not part of
 * the mark being written; it pen-redraws in afterward, the way a
 * signature gets underlined once it's down.
 * Base geometry: Lucide `signature` (ISC).
 */
const DUR = 0.85

export function SignatureIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'signature'}
      {...hoverProps}
    >
      {/* pivot at the flourish's tip (21, 17) — where the pen last lifts */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '21px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      >
        <path d="m21 17-2.156-1.868A.5.5 0 0 0 18 15.5v.5a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1c0-2.545-3.991-3.97-8.5-4a1 1 0 0 0 0 5c4.153 0 4.745-11.295 5.708-13.5a2.5 2.5 0 1 1 3.31 3.284" />
      </motion.g>
      {/* underline pen-redraws once the jot is done */}
      <motion.path
        d="M3 21h18"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.06, 0.62, 1], ease: ['linear', 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'signature',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'write', 'signature'],
}

export default SignatureIcon
