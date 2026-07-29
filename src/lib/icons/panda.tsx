import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Panda — it munches. Two chews: the head (outline, muzzle and eye
 * patches, all one rigid mass) bobs down and up, down and up again,
 * softer the second time. The two ear-shading marks bob the same shape
 * but ~3% late — the small parts feel the motion after the mass that
 * carries it.
 * Base geometry: Lucide `panda` (ISC).
 */
const DUR = 0.9

export function PandaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'panda'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.55, 0.8, 1], ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M11.25 17.25h1.5L12 18z" />
        <path d="m15 12 2 2" />
        <path d="M20.69 9.67a4.5 4.5 0 1 0-7.04-5.5 8.35 8.35 0 0 0-3.3 0 4.5 4.5 0 1 0-7.04 5.5C2.49 11.2 2 12.88 2 14.5 2 19.47 6.48 22 12 22s10-2.53 10-7.5c0-1.62-.48-3.3-1.3-4.83" />
        <path d="m9 12-2 2" />
      </motion.g>
      <motion.path
        d="M18 6.5a.5.5 0 0 0-.5-.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.33, 0.58, 0.83, 1], ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M6 6.5a.495.495 0 0 1 .5-.5"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0.8, 0, 0.6, 0],
            transition: { duration: DUR, times: [0, 0.33, 0.58, 0.83, 1], ease: [easeOutQuart, easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'panda',
  gesture: 'it munches',
  family: 'rigid' as const,
  section: 'Animals & nature',
  tags: ['bear', 'cute', 'china', 'panda'],
}

export default PandaIcon
