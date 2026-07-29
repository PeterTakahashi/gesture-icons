import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Spool — the thread pays out. Both wound-thread paths are one continuous
 * bowtie shape with no isolated thread-end segment to stretch, so the
 * honest move is the whole spool turning once about its own axis — a
 * stitch length paid out and settled.
 * Base geometry: Lucide `spool` (ISC).
 */
const DUR = 0.8

export function SpoolIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'spool'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, 25, 0],
            transition: { duration: DUR, times: [0, 0.55, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M17 13.44 4.442 17.082A2 2 0 0 0 4.982 21H19a2 2 0 0 0 .558-3.921l-1.115-.32A2 2 0 0 1 17 14.837V7.66" />
        <path d="m7 10.56 12.558-3.642A2 2 0 0 0 19.018 3H5a2 2 0 0 0-.558 3.921l1.115.32A2 2 0 0 1 7 9.163v7.178" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'spool',
  gesture: 'the thread pays out',
  family: 'rigid' as const,
  section: 'Objects',
  tags: ['sewing', 'thread', 'craft', 'spool'],
}

export default SpoolIcon
