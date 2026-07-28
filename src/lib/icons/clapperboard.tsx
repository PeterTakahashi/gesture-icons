import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Clapperboard — action! The top stick snaps shut about the hinge corner
 * where it meets the board, fast on the way down (an impact accelerates),
 * then eases back open. The board takes the jolt on the exact frame the
 * stick lands — never a frame before it's touched.
 * Base geometry: Lucide `clapperboard` (ISC).
 */
const DUR = 0.85

export function ClapperboardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clapperboard'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '3px 9px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -18, 0, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.65, 1], ease: [easeInCubic, easeOutQuart, 'linear'] },
          },
        }}
      >
        <path d="m12.296 3.464 3.02 3.956" />
        <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1.1-.3 2.2.3 2.5 1.3z" />
        <path d="m6.18 5.276 3.1 3.899" />
      </motion.g>
      {/* the board takes the jolt exactly when the stick lands (t=0.28) */}
      <motion.path
        d="M3 11h18v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.5, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.36, 0.5], ease: ['linear', easeOutQuart, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clapperboard',
  gesture: 'action!',
  family: 'rigid' as const,
  section: 'Media',
  tags: ['movie', 'scene', 'take'],
}

export default ClapperboardIcon
