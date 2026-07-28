import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Drama — the masks trade moods. Comedy (right) and tragedy (left) each
 * tilt toward one another about their own centers, mirrored and decaying —
 * comedy and tragedy conferring, not one dominating the other.
 * Base geometry: Lucide `drama` (ISC).
 */
const DUR = 1.0

export function DramaIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'drama'}
      {...hoverProps}
    >
      {/* comedy — leans left, toward tragedy */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '16px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -4, 3, -1.5, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M14 6h.01" />
        <path d="M18 6h.01" />
        <path d="M22 5c0 9-4 12-6 12s-6-3-6-12c0-2 2-3 6-3s6 1 6 3" />
        <path d="M17.4 9.9c-.8.8-2 .8-2.8 0" />
      </motion.g>
      {/* tragedy — leans right, toward comedy */}
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '9px 14px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 4, -3, 1.5, 0],
            transition: { duration: DUR, times: [0, 0.16, 0.36, 0.56, 0.76], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10 11h.01" />
        <path d="M6.5 13.1h.01" />
        <path d="M10.1 7.1C9 7.2 7.7 7.7 6 8.6c-3.5 2-4.7 3.9-3.7 5.6 4.5 7.8 9.5 8.4 11.2 7.4.9-.5 1.9-2.1 1.9-4.7" />
        <path d="M9.1 16.5c.3-1.1 1.4-1.7 2.4-1.4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'drama',
  gesture: 'the masks trade moods',
  family: 'rigid' as const,
  section: 'Sport & games',
  tags: ['theater', 'comedy', 'tragedy'],
}

export default DramaIcon
