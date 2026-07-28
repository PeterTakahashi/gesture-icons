import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Dog — it perks its ears. Lucide draws both ears as one continuous shape
 * with the forehead between them, so a sideways rotate would swing one ear
 * down as the other rose — dishonest. Instead the ear shape stretches
 * upright about its own base line, both tips rising together, holds, and
 * relaxes back; the head tilts along with it. Someone's home.
 * Base geometry: Lucide `dog` (ISC).
 */
const DUR = 1.0

export function DogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'dog'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 3, 3, 0],
            transition: { duration: DUR, times: [0, 0.26, 0.62, 0.92], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      >
        <path d="M11.25 16.25h1.5L12 17z" />
        <path d="M16 14v.5" />
        <path d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444a11.702 11.702 0 0 0-.493-3.309" />
        <path d="M8 14v.5" />
      </motion.g>
      <motion.path
        d="M8.5 8.5c-.384 1.05-1.083 2.028-2.344 2.5-1.931.722-3.576-.297-3.656-1-.113-.994 1.177-6.53 4-7 1.923-.321 3.651.845 3.651 2.235A7.497 7.497 0 0 1 14 5.277c0-1.39 1.844-2.598 3.767-2.277 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5"
        style={{ transformBox: 'view-box', transformOrigin: '12px 8.5px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scaleY: 1 },
          animate: {
            scaleY: [1, 1.18, 1.18, 1],
            transition: { duration: DUR, times: [0, 0.22, 0.6, 0.9], ease: [easeOutQuart, 'linear', easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'dog',
  gesture: 'it perks its ears',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['pet', 'puppy', 'animal'],
}

export default DogIcon
