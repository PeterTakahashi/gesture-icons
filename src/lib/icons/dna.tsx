import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * DNA — the helix twists. A 2D glyph cannot actually helix, so the two
 * backbone fragments (with the rungs that ride them) slide vertically
 * opposite ways and back — the twist read as a counter-slide. The long
 * unbroken diagonal strand crossing the whole glyph is shared structure
 * between both backbones, not exclusive to either, so it is the one part
 * that holds still.
 * Base geometry: Lucide `dna` (ISC).
 */
const DUR = 0.9

export function DnaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dna'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1.3, 0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m14 8-1.5-1.5" />
        <path d="M15 2c-1.798 1.998-2.518 3.995-2.807 5.993" />
        <path d="m16.5 10.5 1 1" />
        <path d="m17 6-2.891-2.891" />
        <path d="m20 9 .891.891" />
      </motion.g>
      <path d="M2 15c6.667-6 13.333 0 20-6" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 1.3, -0.2, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.72, 1], ease: [easeInOutCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="m10 16 1.5 1.5" />
        <path d="M3.109 14.109 4 15" />
        <path d="m6.5 12.5 1 1" />
        <path d="m7 18 2.891 2.891" />
        <path d="M9 22c1.798-1.998 2.518-3.995 2.807-5.993" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'dna',
  gesture: 'the helix twists',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['genetics', 'biology', 'science'],
}

export default DnaIcon
