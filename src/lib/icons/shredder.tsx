import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Shredder — the document is destroyed. The paper feeds down past the slot
 * line and is genuinely gone, clipped away rather than faded — a clip-path
 * fixed at the slot stands in for the machine's throat. Once hidden it is
 * repositioned, still hidden, above the frame, then a fresh sheet drops back
 * into place on an ease-out. The strips below wiggle only while a sheet is
 * actually passing through them; the body never moves.
 * Base geometry: Lucide `shredder` (ISC).
 */
const DUR = 1.2

export function ShredderIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shredder'}
      {...hoverProps}
    >
      <defs>
        <clipPath id="gi-shredder-clip">
          <rect x="-4" y="-15" width="32" height="28" />
        </clipPath>
      </defs>
      <g clipPath="url(#gi-shredder-clip)">
        <motion.g
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 0 },
            animate: {
              // slide down and vanish behind the slot clip, hold gone, then an
              // equal-times jump (13 -> -15 at the same instant) repositions it
              // above the frame while still hidden, and it arrives from there
              y: [0, 13, 13, -15, 0],
              transition: {
                duration: DUR,
                times: [0, 0.36, 0.42, 0.42, 1],
                ease: [gravity, 'linear', 'linear', easeOutQuart],
              },
            },
          }}
        >
          <path d="M4 13V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.706.706l3.588 3.588A2.4 2.4 0 0 1 20 8v5" />
          <path d="M14 2v5a1 1 0 0 0 1 1h5" />
        </motion.g>
      </g>
      <path d="M2 13h20" />
      {[
        { d: 'M10 22v-5', delay: 0.32 },
        { d: 'M14 19v-2', delay: 0.34 },
        { d: 'M18 20v-3', delay: 0.33 },
        { d: 'M6 20v-3', delay: 0.31 },
      ].map((strip) => (
        <motion.path
          key={strip.d}
          d={strip.d}
          initial="normal"
          animate={controls}
          variants={{
            normal: { x: 0 },
            animate: {
              x: [0, 0.5, -0.5, 0.5, 0],
              transition: { duration: DUR * 0.25, delay: DUR * strip.delay, times: [0, 0.3, 0.55, 0.8, 1], ease: 'linear' },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'shredder',
  gesture: 'the document is destroyed',
  family: 'secondary' as const,
  section: 'Objects',
  tags: ['paper', 'secure', 'delete', 'shredder'],
}

export default ShredderIcon
