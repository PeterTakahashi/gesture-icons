import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart, easeInCubic } from '../core/easings'

/**
 * Keyboard — a key is struck. One key dot presses down and springs back,
 * a second key follows 90ms later — two keystrokes, never a chord. The
 * frame and every other key stay exactly where Lucide drew them.
 * Base geometry: Lucide `keyboard` (ISC).
 */
const DUR = 0.6

export function KeyboardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = (delay: number) => ({
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.6, 1.2, 1],
      transition: { duration: DUR, delay, times: [0, 0.22, 0.5, 0.78], ease: [easeInCubic, easeOutQuart] },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'keyboard'}
      {...hoverProps}
    >
      <motion.path
        d="M10 8h.01"
        style={{ transformBox: 'view-box', transformOrigin: '10px 8px' }}
        initial="normal" animate={controls} variants={press(0)}
      />
      <path d="M12 12h.01" />
      <motion.path
        d="M14 8h.01"
        style={{ transformBox: 'view-box', transformOrigin: '14px 8px' }}
        initial="normal" animate={controls} variants={press(0.09)}
      />
      <path d="M16 12h.01" />
      <path d="M18 8h.01" />
      <path d="M6 8h.01" />
      <path d="M7 16h10" />
      <path d="M8 12h.01" />
      <rect width="20" height="16" x="2" y="4" rx="2" />
    </svg>
  )
}

export const meta = {
  name: 'keyboard',
  gesture: 'a key is struck',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['typing', 'input'],
}

export default KeyboardIcon
