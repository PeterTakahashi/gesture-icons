import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Copyright — rights reserved. A small, formal stamp: the whole mark
 * presses in and pops back once, understated next to plus.tsx's playful
 * version — a notarization, not a celebration.
 * Base geometry: Lucide `copyright` (ISC).
 */
const DUR = 0.6

export function CopyrightIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'copyright'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.93, 1.06, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.6, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <circle cx="12" cy="12" r="10" />
        <path d="M14.83 14.83a4 4 0 1 1 0-5.66" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'copyright',
  gesture: 'rights reserved',
  family: 'rigid' as const,
  section: 'Interface',
  tags: ['legal', 'license', 'copyright'],
}

export default CopyrightIcon
