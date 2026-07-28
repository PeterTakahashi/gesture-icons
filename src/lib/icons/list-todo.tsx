import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutQuart, pen, settleBack } from '../core/easings'

/**
 * List todo — VARIANT(list-checks). The finished tick redraws itself
 * (erase, pen rewrite), and right after, the empty box gives a firm
 * little press — done, and next.
 * Base geometry: Lucide `list-todo` (ISC).
 */
const DUR = 1.0

export function ListTodoIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'list todo'}
      {...hoverProps}
    >
      <path d="M13 5h8" />
      <path d="M13 12h8" />
      <path d="M13 19h8" />
      <motion.path
        d="m3 17 2 2 4-4"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.2, 0.35, 0.68], ease: [easeInOutQuart, 'linear', pen] },
          },
        }}
      />
      <motion.rect
        x="3" y="4" width="6" height="6" rx="1"
        style={{ transformBox: 'view-box', transformOrigin: '6px 7px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1, 0.94, 1],
            transition: { duration: DUR, times: [0, 0.72, 0.85, 1], ease: ['linear', easeInCubic, settleBack] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'list-todo',
  gesture: 'the next box awaits',
  family: 'draw-on' as const,
  section: 'Text & editing',
  tags: ['todo', 'tasks'],
}

export default ListTodoIcon
