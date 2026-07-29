import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, easeInOutCubic, settleBack } from '../core/easings'

/**
 * File diff — the changes announce themselves. The page holds, dipping
 * once on the accent frame; the plus mark pops in (a line added, scale
 * 0.001 → 1.3 → 1, settleBack) while the minus mark is escorted out along
 * its own axis and back — a line removed, not deleted from the page.
 * Base geometry: Lucide `file-diff` (ISC).
 */
const DUR = 0.9

export function FileDiffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'file diff'}
      {...hoverProps}
    >
      <motion.path
        d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.4, 0],
            transition: { duration: DUR, times: [0, 0.45, 0.6, 0.9], ease: [easeOutQuart, easeInOutCubic] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.001, 1.3, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.55, 0.85], ease: [easeInCubic, settleBack, easeOutQuart] },
          },
        }}
      >
        <path d="M9 10h6" />
        <path d="M12 13V7" />
      </motion.g>
      <motion.path
        d="M9 17h6"
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.4, 1.3, 0],
            transition: { duration: DUR, times: [0, 0.2, 0.55, 0.9], ease: [easeInOutCubic, [0.5, 0, 0.2, 1.15], easeOutQuart] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'file-diff',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['file', 'document', 'diff'],
}

export default FileDiffIcon
