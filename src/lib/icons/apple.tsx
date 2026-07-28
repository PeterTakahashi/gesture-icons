import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Apple — it is polished. The body rocks about its base, decaying, buffed
 * on a sleeve; the stem — the one small part hinged separately at the top —
 * follows the same rock a beat late (3%), the way a small attached part
 * lags a bigger swing. (Lucide's apple glyph carries no separate leaf, so
 * the stem stands in for the lagging child part bell.tsx's clapper plays.)
 * Base geometry: Lucide `apple` (ISC).
 */
const DUR = 1.0

export function AppleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'apple'}
      {...hoverProps}
    >
      <motion.path
        d="M18.237 21A15 15 0 0 0 22 11a6 6 0 0 0-10-4.472A6 6 0 0 0 2 11a15.1 15.1 0 0 0 3.763 10 3 3 0 0 0 3.648.648 5.5 5.5 0 0 1 5.178 0A3 3 0 0 0 18.237 21"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -2, 0],
            transition: { duration: DUR, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.path
        d="M12 6.528V3a1 1 0 0 1 1-1h0"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -2, 0],
            transition: { duration: DUR, delay: DUR * 0.03, times: [0, 0.25, 0.5, 0.75, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'apple',
  gesture: 'it is polished',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['fruit', 'health'],
}

export default AppleIcon
