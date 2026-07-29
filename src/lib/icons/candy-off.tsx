import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, pen } from '../core/easings'

/**
 * Candy off — it is switched off. The slash DRAWs across (erase then
 * pen-redraw, never a fade — same trick as eye-off.tsx and bot-off.tsx)
 * while, in the gap where it's briefly erased, the candy gives ONE small
 * defeated sag/tilt about its own center and settles back before the
 * slash redraws over it.
 * Base geometry: Lucide `candy-off` (ISC).
 */
const DUR = 0.9

export function CandyOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'candy off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, 0, 3, 0],
            y: [0, 0, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.65, 0.95], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M10 10v7.9" />
        <path d="M11.802 6.145a5 5 0 0 1 6.053 6.053" />
        <path d="M14 6.1v2.243" />
        <path d="m15.5 15.571-.964.964a5 5 0 0 1-7.071 0 5 5 0 0 1 0-7.07l.964-.965" />
        <path d="M16 7V3a1 1 0 0 1 1.707-.707 2.5 2.5 0 0 0 2.152.717 1 1 0 0 1 1.131 1.131 2.5 2.5 0 0 0 .717 2.152A1 1 0 0 1 21 8h-4" />
        <path d="M8 17v4a1 1 0 0 1-1.707.707 2.5 2.5 0 0 0-2.152-.717 1 1 0 0 1-1.131-1.131 2.5 2.5 0 0 0-.717-2.152A1 1 0 0 1 3 16h4" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'candy-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Food & drink',
  tags: ['disabled', 'off', 'candy'],
}

export default CandyOffIcon
