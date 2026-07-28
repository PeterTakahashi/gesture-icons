import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack, easeOutQuart } from '../core/easings'

/**
 * Package plus — one more is added. VARIANT(plus): the corner plus stamps
 * itself the way plus.tsx does — press, overshoot, land — and the box takes
 * a small dip on that same landing frame, as if the added weight just
 * registered.
 * Base geometry: Lucide `package-plus` (ISC).
 */
const DUR = 0.75

export function PackagePlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'package plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.62, 0.82, 1], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="M21 10.535V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.729l7 4a2 2 0 0 0 2 .001l1.675-.955" />
        <path d="M3.29 7 12 12l8.71-5" />
        <path d="m7.5 4.27 8.997 5.148" />
        <path d="M12 22V12" />
      </motion.g>
      {/* the plus stamps: press, overshoot, land */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '19px 17px' }}
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
        <path d="M16 17h6" />
        <path d="M19 14v6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'package-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Money & commerce',
  tags: ['box', 'add'],
}

export default PackagePlusIcon
