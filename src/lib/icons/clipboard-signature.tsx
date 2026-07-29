import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, pen } from '../core/easings'

/**
 * Clipboard signature — the pen jots, tip-pivoted, then the underline
 * pen-redraws right after it lifts — the signature landing under its own
 * mark. The clipboard beneath holds still throughout.
 * Base geometry: Lucide `clipboard-signature` (ISC).
 */
const DUR = 1.1

export function ClipboardSignatureIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard signature'}
      {...hoverProps}
    >
      <rect width="8" height="4" x="8" y="2" rx="1" />
      <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-.5" />
      <path d="M16 4h2a2 2 0 0 1 1.73 1" />
      <motion.path
        d="M21.378 12.626a1 1 0 0 0-3.004-3.004l-4.01 4.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        style={{ transformBox: 'view-box', transformOrigin: '13px 17.4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR * 0.65, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      />
      <motion.path
        d="M8 18h1"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.62, 0.7, 0.95], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clipboard-signature',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['edit', 'write', 'clipboard', 'signature'],
}

export default ClipboardSignatureIcon
