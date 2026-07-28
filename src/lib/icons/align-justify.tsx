import { motion } from 'motion/react'
import type { Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic } from '../core/easings'

/**
 * Align justify — every line stretches to fill the measure: a subtle
 * squeeze-then-stretch about the shared centerline, 4% staggered
 * top-down so the justify reads as a ripple across the paragraph.
 * Base geometry: Lucide `align-justify` (ISC).
 */
const DUR = 0.8

function justify(delay: number): Variants {
  return {
    normal: { scaleX: 1 },
    animate: {
      scaleX: [1, 0.96, 1.0],
      transition: { duration: DUR, delay, times: [0, 0.45, 1], ease: easeInOutCubic },
    },
  }
}

export function AlignJustifyIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'align justify'}
      {...hoverProps}
    >
      <motion.path
        d="M3 5h18"
        style={{ transformBox: 'view-box', transformOrigin: '12px 5px' }}
        initial="normal" animate={controls} variants={justify(0)}
      />
      <motion.path
        d="M3 12h18"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal" animate={controls} variants={justify(DUR * 0.04)}
      />
      <motion.path
        d="M3 19h18"
        style={{ transformBox: 'view-box', transformOrigin: '12px 19px' }}
        initial="normal" animate={controls} variants={justify(DUR * 0.08)}
      />
    </svg>
  )
}

export const meta = {
  name: 'align-justify',
  gesture: 'the lines fill the measure',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['format', 'paragraph'],
}

export default AlignJustifyIcon
