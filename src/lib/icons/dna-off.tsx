import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * DNA off — the strand is switched off. The slash erases and pen-redraws
 * across the whole thing (never a fade), while the double helix gives one
 * small defeated sag — a 3° droop about its own center that never recovers
 * into a bounce, just settles back flat.
 * Base geometry: Lucide `dna-off` (ISC).
 */
const DUR = 0.9

export function DnaOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dna off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -3, 0],
            y: [0, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M15 2c-1.35 1.5-2.092 3-2.5 4.5L14 8" />
        <path d="m17 6-2.891-2.891" />
        <path d="M2 15c3.333-3 6.667-3 10-3" />
        <path d="m20 9 .891.891" />
        <path d="M22 9c-1.5 1.35-3 2.092-4.5 2.5l-1-1" />
        <path d="M3.109 14.109 4 15" />
        <path d="m6.5 12.5 1 1" />
        <path d="m7 18 2.891 2.891" />
        <path d="M9 22c1.35-1.5 2.092-3 2.5-4.5L10 16" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.38, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'dna-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Health',
  tags: ['disabled', 'off', 'dna'],
}

export default DnaOffIcon
