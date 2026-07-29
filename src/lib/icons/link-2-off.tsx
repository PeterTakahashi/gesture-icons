import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Link 2 off — it is switched off. VARIANT: the slash erases and pen-
 * redraws itself across the glyph exactly as `eye-off.tsx`'s does, while
 * the broken link gives ONE small defeated sag — down and a hair of tilt,
 * no bounce — and settles back, never a repeating shake.
 * Base geometry: Lucide `link-2-off` (ISC).
 */
const DUR = 0.9

export function Link2OffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'link 2 off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2.4, 0],
            rotate: [0, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.85], ease: [easeInCubic, easeOutQuart] },
          },
        }}
      >
        <path d="M9 17H7A5 5 0 0 1 7 7" />
        <path d="M15 7h2a5 5 0 0 1 4 8" />
        <line x1="8" x2="12" y1="12" y2="12" />
      </motion.g>
      <motion.line
        x1="2" x2="22" y1="2" y2="22"
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
  name: 'link-2-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Interface',
  tags: ['disabled', 'off', 'link'],
}

export default Link2OffIcon
