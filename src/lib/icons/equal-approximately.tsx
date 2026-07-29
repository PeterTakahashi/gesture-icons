import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Equal approximately — there is no frame here, just the math mark itself,
 * so it takes the STAMP option from the frame-and-mark menu directly: the
 * whole glyph presses down a hair and pops back past its own size, the beat
 * of a mark being set down on the page.
 * Base geometry: Lucide `equal-approximately` (ISC).
 */
const DUR = 0.7

export function EqualApproximatelyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'equal approximately'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.88, 1.14, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M5 15a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" />
        <path d="M5 9a6.5 6.5 0 0 1 7 0 6.5 6.5 0 0 0 7 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'equal-approximately',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['frame', 'mark', 'equal', 'approximately'],
}

export default EqualApproximatelyIcon
