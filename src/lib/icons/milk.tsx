import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { windupOvershoot, easeInOutCubic } from '../core/easings'

/**
 * Milk — it pours a little. The carton tips about its bottom pour-side
 * corner, holds the pour a beat, then rights itself with a settle.
 * Base geometry: Lucide `milk` (ISC).
 */
const DUR = 1.0

export function MilkIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'milk'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 20px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -10, -10, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.68, 1], ease: [windupOvershoot, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M8 2h8" />
        <path d="M9 2v2.789a4 4 0 0 1-.672 2.219l-.656.984A4 4 0 0 0 7 10.212V20a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2v-9.789a4 4 0 0 0-.672-2.219l-.656-.984A4 4 0 0 1 15 4.788V2" />
        <path d="M7 15a6.472 6.472 0 0 1 5 0 6.47 6.47 0 0 0 5 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'milk',
  gesture: 'it pours a little',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['drink', 'dairy'],
}

export default MilkIcon
