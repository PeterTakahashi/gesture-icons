import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * File cog — it draws itself. VARIANT(file-text): the page holds still; the
 * cog's eight teeth are 45°-fold symmetric, so a one-tooth turn (wind-up,
 * overshoot, click home) lands on the same picture it left, the same
 * mechanic as cog.tsx just at a coarser fold. The page dips on the frame
 * the tooth clicks home.
 * Base geometry: Lucide `file-cog` (ISC).
 */
const DUR = 1.0
const OVERSHOOT_TURN: [number, number, number, number] = [0.5, 0, 0.3, 1.15]

export function FileCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file cog'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.74, 0.88, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M15 8a1 1 0 0 1-1-1V2a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8z" />
        <path d="M20 8v12a2 2 0 0 1-2 2h-4.182" />
        <path d="M4 10.592V4a2 2 0 0 1 2-2h8" />
      </motion.g>
      <circle cx="7" cy="18" r="3" />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -6, 51, 45],
            transition: { duration: DUR, times: [0, 0.2, 0.6, 0.86], ease: [easeInOutCubic, OVERSHOOT_TURN, easeOutQuart] },
          },
        }}
      >
        <path d="m3.305 19.53.923-.382" />
        <path d="m4.228 16.852-.924-.383" />
        <path d="m5.852 15.228-.383-.923" />
        <path d="m5.852 20.772-.383.924" />
        <path d="m8.148 15.228.383-.923" />
        <path d="m8.53 21.696-.382-.924" />
        <path d="m9.773 16.852.922-.383" />
        <path d="m9.773 19.148.922.383" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'file-cog',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'cog'],
}

export default FileCogIcon
