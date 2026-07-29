import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Pi square — it draws itself. The inner mark is a math glyph, so it STAMPs
 * in place — a press to 0.82, a pop past 1.14, a settle — exactly as
 * plus.tsx does, while the frame breathes once, softly, on the same clock.
 * Base geometry: Lucide `pi-square` (ISC).
 */
const DUR = 0.75

export function PiSquareIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'pi square'}
      {...hoverProps}
    >
      <motion.rect
        width="18" height="18" x="3" y="3" rx="2"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.82, 1.14, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M7 7h10" />
        <path d="M10 7v10" />
        <path d="M16 17a2 2 0 0 1-2-2V7" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'pi-square',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['frame', 'mark', 'square'],
}

export default PiSquareIcon
