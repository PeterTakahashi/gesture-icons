import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Align center — the shorter lines re-center themselves with a tiny
 * symmetric squeeze about the shared centerline (x=12), staggered so
 * the settle reads top-down; the full-width line is already centered
 * and stays still.
 * Base geometry: Lucide `align-center` (ISC).
 */
const DUR = 0.7

function squeeze(delay: number): Variants {
  return {
    normal: { scaleX: 1 },
    animate: {
      scaleX: [1, 0.9, 1],
      transition: { duration: DUR, delay, times: [0, 0.4, 1], ease: easeInOutCubic },
    },
  }
}

export function AlignCenterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'align center'}
      {...hoverProps}
    >
      <path d="M21 5H3" />
      <motion.path
        d="M17 12H7"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal" animate={controls} variants={squeeze(0)}
      />
      <motion.path
        d="M19 19H5"
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal" animate={controls} variants={squeeze(DUR * 0.06)}
      />
    </svg>
  )
}

export const meta = {
  name: 'align-center',
  gesture: 'the lines find center',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['format', 'paragraph'],
}

export default AlignCenterIcon
