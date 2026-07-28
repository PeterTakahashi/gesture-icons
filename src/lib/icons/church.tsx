import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Church — the bell tolls. The cross sways about its own base, where it is
 * rooted into the roof peak, twice and decaying — the tower feeling its bell
 * ring. The roof, tower body and door never move.
 * Base geometry: Lucide `church` (ISC).
 */
const DUR = 1.0

export function ChurchIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'church'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -2, 2, -1.5, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.18, 0.4, 0.62, 0.82, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10 9h4" />
        <path d="M12 7v5" />
      </motion.g>
      <path d="M14 21v-3a2 2 0 0 0-4 0v3" />
      <path d="m18 9 3.52 2.147a1 1 0 0 1 .48.854V19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-6.999a1 1 0 0 1 .48-.854L6 9" />
      <path d="M6 21V7a1 1 0 0 1 .376-.782l5-3.999a1 1 0 0 1 1.249.001l5 4A1 1 0 0 1 18 7v14" />
    </svg>
  )
}

export const meta = {
  name: 'church',
  gesture: 'the bell tolls',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['chapel', 'faith'],
}

export default ChurchIcon
