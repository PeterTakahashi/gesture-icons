import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Tag x — it's declined. VARIANT(x): only the X shakes "no" — a decaying
 * rotation about its own center (19px, 12.5px, the midpoint of its two
 * diagonals) — while the tag body and its punched hole hold perfectly still.
 * Base geometry: Lucide `tag-x` (ISC).
 */
const DUR = 0.85

export function TagXIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'tag x'}
      {...hoverProps}
    >
      <path d="m16.5 6.5-3.914-3.914A2 2 0 0 0 11.172 2H4a2 2 0 0 0-2 2v7.172a2 2 0 0 0 .586 1.414l8.704 8.704a2.43 2.43 0 0 0 3.42 0l1.79-1.79" />
      <circle cx="7.5" cy="7.5" r=".5" fill={color} />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 12.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, 8, -5, 3, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.36, 0.56, 0.76, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="m16.5 10.5 5 5" />
        <path d="m21.5 10.5-5 5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'tag-x',
  gesture: "it's declined",
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['cancel', 'remove', 'tag'],
}

export default TagXIcon
