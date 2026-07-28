import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Chef hat — the chef bows. The whole hat nods forward about the brim,
 * holds the bow a beat, then straightens back up — a professional nod,
 * not a topple.
 * Base geometry: Lucide `chef-hat` (ISC).
 */
const DUR = 0.9

export function ChefHatIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'chef hat'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 17px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 6, 6, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.7, 1], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M17 21a1 1 0 0 0 1-1v-5.35c0-.457.316-.844.727-1.041a4 4 0 0 0-2.134-7.589 5 5 0 0 0-9.186 0 4 4 0 0 0-2.134 7.588c.411.198.727.585.727 1.041V20a1 1 0 0 0 1 1Z" />
        <path d="M6 17h12" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'chef-hat',
  gesture: 'the chef bows',
  family: 'rigid' as const,
  section: 'Food & drink',
  tags: ['cooking', 'kitchen'],
}

export default ChefHatIcon
