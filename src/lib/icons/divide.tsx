import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Divide — it splits evenly. The two dots nudge apart vertically, away
 * from the bar, and return; the bar takes a slight press right as they
 * reach their widest point — the split and the reunion in one beat.
 * Base geometry: Lucide `divide` (ISC).
 */
const DUR = 0.9

export function DivideIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'divide'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" r="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cy: 6 },
          animate: {
            cy: [6, 6.3, 4.5, 6],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
      <motion.line
        x1="5" x2="19" y1="12" y2="12"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1, 0.75, 1.1, 1],
            transition: { duration: DUR, times: [0, 0.4, 0.55, 0.75, 1], ease: ['linear', easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      />
      <motion.circle
        cx="12" r="1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { cy: 18 },
          animate: {
            cy: [18, 17.7, 19.5, 18],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInOutCubic, easeOutQuart, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'divide',
  gesture: 'it splits evenly',
  family: 'rigid' as const,
  section: 'Charts & math',
  tags: ['math', 'operator'],
}

export default DivideIcon
