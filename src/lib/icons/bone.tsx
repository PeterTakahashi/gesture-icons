import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Bone — the dog wants it. A tempting waggle about the center, decaying,
 * with a little hop of anticipation on the very first swing only.
 * Base geometry: Lucide `bone` (ISC).
 */
const DUR = 0.9

export function BoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'bone'}
      {...hoverProps}
    >
      <motion.path
        d="M17 10c.7-.7 1.69 0 2.5 0a2.5 2.5 0 1 0 0-5 .5.5 0 0 1-.5-.5 2.5 2.5 0 1 0-5 0c0 .81.7 1.8 0 2.5l-7 7c-.7.7-1.69 0-2.5 0a2.5 2.5 0 0 0 0 5c.28 0 .5.22.5.5a2.5 2.5 0 1 0 5 0c0-.81-.7-1.8 0-2.5Z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, y: 0 },
          animate: {
            rotate: [0, -8, 6, -3, 0],
            y: [0, -1, 0, 0, 0],
            transition: {
              duration: DUR,
              rotate: { times: [0, 0.22, 0.48, 0.72, 1], ease: easeInOutCubic },
              y: { times: [0, 0.22, 0.4, 0.72, 1], ease: easeOutQuart },
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'bone',
  gesture: 'the dog wants it',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['dog', 'pet', 'treat', 'bone'],
}

export default BoneIcon
