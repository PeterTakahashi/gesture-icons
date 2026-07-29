import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Circle euro — the inner mark performs euro.tsx's own verb: a stamp with a
 * tiny turn (press, twist a hair, pop past size, settle) while the still
 * ring takes one soft breath with it, on the same clock.
 * Base geometry: Lucide `circle-euro` (ISC).
 */
const DUR = 0.7

export function CircleEuroIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'circle euro'}
      {...hoverProps}
    >
      <motion.circle
        cx="12" cy="12" r="10"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.03, 1],
            transition: { duration: DUR, times: [0, 0.45, 0.85], ease: easeOutQuart },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1, rotate: 0 },
          animate: {
            scale: [1, 0.9, 1.12, 1],
            rotate: [0, -4, 2, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M15 9.4a4 4 0 1 0 0 5.2" />
        <path d="M7 12h5" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'circle-euro',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['circle', 'euro'],
}

export default CircleEuroIcon
