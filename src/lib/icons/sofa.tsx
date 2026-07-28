import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, settleBack } from '../core/easings'

/**
 * Sofa — it takes two. The seat is a single unsplit path in this glyph, so
 * "left cushion then right" is carried as one shape tilting to take a dip on
 * one side, settling, then tilting to take a dip on the other — two guests
 * arriving 120ms apart rather than two independently moving cushions.
 * Backrest, legs and the center divider stay put.
 * Base geometry: Lucide `sofa` (ISC).
 */
const DUR = 1.0

export function SofaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'sofa'}
      {...hoverProps}
    >
      <path d="M20 9V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v3" />
      <motion.path
        d="M2 16a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5a2 2 0 0 0-4 0v1.5a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5V11a2 2 0 0 0-4 0z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 13px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 1.3, 0, 0, 1.3, 0],
            rotate: [0, -1.3, 0, 0, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.22, 0.36, 0.48, 0.7, 0.84], ease: [easeInCubic, settleBack, 'linear', easeInCubic, settleBack] },
          },
        }}
      />
      <path d="M4 18v2" />
      <path d="M20 18v2" />
      <path d="M12 4v9" />
    </svg>
  )
}

export const meta = {
  name: 'sofa',
  gesture: 'it takes two',
  family: 'rigid' as const,
  section: 'Home',
  tags: ['furniture', 'couch', 'living'],
}

export default SofaIcon
