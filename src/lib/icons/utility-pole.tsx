import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Utility pole — the lines carry on. Lucide draws both wire spans as one
 * path meeting at a shared sag point; they are split here into two
 * identical-pixel segments so each can sway from its own attachment post,
 * left then right, 5% apart — wind on the line, the pole and crossbar still.
 * Base geometry: Lucide `utility-pole` (ISC).
 */
const DUR = 0.9
const STEP = DUR * 0.05

export function UtilityPoleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'utility pole'}
      {...hoverProps}
    >
      <path d="M12 2v20" />
      <path d="M2 5h20" />
      <path d="M3 3v2" />
      <path d="M7 3v2" />
      <path d="M17 3v2" />
      <path d="M21 3v2" />
      {/* left span, from its own post */}
      <motion.path
        d="M12 12l-7-7"
        style={{ transformBox: 'view-box', transformOrigin: '5px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.06, 1],
            transition: { duration: DUR, delay: 0, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
      {/* right span, follows 5% later */}
      <motion.path
        d="M19 5l-7 7"
        style={{ transformBox: 'view-box', transformOrigin: '19px 5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.06, 1],
            transition: { duration: DUR, delay: STEP, times: [0, 0.5, 1], ease: easeInOutCubic },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'utility-pole',
  gesture: 'the lines carry on',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['power', 'infrastructure', 'utility', 'pole'],
}

export default UtilityPoleIcon
