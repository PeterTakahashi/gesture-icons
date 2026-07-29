import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Mouse pointer 2 — it does what it means. VARIANT(mouse-pointer): the
 * single-path cursor NUDGEs down-right fast, hits a hard stop, and settles
 * back — one click.
 * Base geometry: Lucide `mouse-pointer-2` (ISC).
 */
const DUR = 0.7
const D = 0.7071
const DRIVE = 1.2
const WIND = 0.3

export function MousePointer2Icon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'mouse pointer 2'}
      {...hoverProps}
    >
      <motion.path
        d="M4.037 4.688a.495.495 0 0 1 .651-.651l16 6.5a.5.5 0 0 1-.063.947l-6.124 1.58a2 2 0 0 0-1.438 1.435l-1.579 6.126a.5.5 0 0 1-.947.063z"
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
  name: 'mouse-pointer-2',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['cursor', 'click', 'pointer', 'mouse'],
}

export default MousePointer2Icon
