import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Eye closed — it refuses to look. The lashes press down together and hold
 * a beat, squeezing the lid shut tighter, then relax back — the lid itself
 * stays exactly as drawn throughout.
 * Base geometry: Lucide `eye-closed` (ISC).
 */
const DUR = 0.8

export function EyeClosedIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'eye closed'}
      {...hoverProps}
    >
      <path d="M2 8a10.645 10.645 0 0 0 20 0" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="m15 18-.722-3.25" />
        <path d="m20 15-1.726-2.05" />
        <path d="m4 15 1.726-2.05" />
        <path d="m9 18 .722-3.25" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'eye-closed',
  gesture: 'it refuses to look',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['hidden', 'sleep', 'privacy', 'eye', 'closed'],
}

export default EyeClosedIcon
