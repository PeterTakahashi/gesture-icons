import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInOutCubic } from '../core/easings'

/**
 * Balloon — it tugs at the string. Buoyancy: the whole balloon rises and
 * bobs from side to side, hinged at the knot where the string is tied
 * (bottom), then sinks back down slowly as the lift fades.
 * Base geometry: Lucide `balloon` (ISC).
 */
const DUR = 1.3

export function BalloonIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'balloon'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17px 22px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, -2, -2, -1.2, 0],
            rotate: [0, 4, -4, 2.5, -1.2, 0],
            transition: {
              duration: DUR,
              y: { times: [0, 0.3, 0.62, 0.82, 1], ease: [easeOutQuart, 'linear', easeInOutCubic, easeInOutCubic] },
              rotate: { times: [0, 0.24, 0.5, 0.72, 0.88, 1], ease: easeInOutCubic },
            },
          },
        }}
      >
        <path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" />
        <path d="M12 6a2 2 0 0 1 2 2" />
        <path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'balloon',
  gesture: 'it tugs at the string',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['party', 'float', 'celebrate', 'balloon'],
}

export default BalloonIcon
