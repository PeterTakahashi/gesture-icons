import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Map plus — one more is added. The plus dips to nothing and overshoots back
 * — the same beat as user-plus.tsx — while the map body takes a 0.5-unit
 * dip on the frame the plus lands, everything else (outline and both fold
 * creases) holding still.
 * Base geometry: Lucide `map-plus` (ISC).
 */
const DUR = 1.0

export function MapPlusIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'map plus'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.5, 0.62, 0.85], ease: ['linear', easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="m11 19-1.106-.552a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0l4.212 2.106a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619V12" />
        <path d="M15 5.764V12" />
        <path d="M9 3.236v15" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M18 15v6" />
        <path d="M21 18h-6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'map-plus',
  gesture: 'one more is added',
  family: 'rigid' as const,
  section: 'Transport',
  tags: ['add', 'new', 'map', 'plus'],
}

export default MapPlusIcon
