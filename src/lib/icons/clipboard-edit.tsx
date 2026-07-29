import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Clipboard edit — the pen writes, tip-pivoted exactly as pencil.tsx does: a
 * wind-up rotation with a small jot in x/y about the point where its tip
 * meets the page, while the clipboard beneath it holds perfectly still.
 * Base geometry: Lucide `clipboard-edit` (ISC).
 */
const DUR = 0.85

export function ClipboardEditIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard edit'}
      {...hoverProps}
    >
      <path d="M16 4h2a2 2 0 0 1 2 2v2" />
      <path d="M8 22H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      <rect x="8" y="2" width="8" height="4" rx="1" />
      <motion.path
        d="M21.34 15.664a1 1 0 1 0-3.004-3.004l-5.01 5.012a2 2 0 0 0-.506.854l-.837 2.87a.5.5 0 0 0 .62.62l2.87-.837a2 2 0 0 0 .854-.506z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 21.4px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0, x: 0, y: 0 },
          animate: {
            rotate: [0, -9, 4, 0],
            x: [0, 0, -1, 0],
            y: [0, 0, 1, 0],
            transition: { duration: DUR, times: [0, 0.3, 0.65, 1], ease: [easeInOutCubic, pen, easeInOutCubic] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'clipboard-edit',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['edit', 'write', 'clipboard'],
}

export default ClipboardEditIcon
