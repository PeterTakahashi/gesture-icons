import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, gravity } from '../core/easings'

/**
 * Construction — work in progress. The barrier board takes one small bounce
 * as if just set down, its painted stripes riding along with it; the posts
 * it hangs on never move.
 * Base geometry: Lucide `construction` (ISC).
 */
const DUR = 0.8

export function ConstructionIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'construction'}
      {...hoverProps}
    >
      <path d="M17 14v7" />
      <path d="M7 14v7" />
      <path d="M17 3v3" />
      <path d="M7 3v3" />
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, -1, 0.3, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeOutQuart, gravity, easeOutQuart] },
          },
        }}
      >
        <rect x="2" y="6" width="20" height="8" rx="1" />
        <path d="M10 14 2.3 6.3" />
        <path d="m14 6 7.7 7.7" />
        <path d="m8 6 8 8" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'construction',
  gesture: 'work in progress',
  family: 'rigid' as const,
  section: 'Buildings',
  tags: ['site', 'barrier', 'wip', 'construction'],
}

export default ConstructionIcon
