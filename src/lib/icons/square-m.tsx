import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen } from '../core/easings'

/**
 * Square M — it draws itself. The letter is a plain glyph, not an arrow,
 * check, X, plus, or play head, so none of those menu items honestly apply —
 * the closest honest verb for a stroke letter is a pen redraw: it erases
 * fast then writes itself back on, pen-eased into the stop. The square frame
 * around it holds still.
 * Base geometry: Lucide `square-m` (ISC).
 */
const DUR = 0.9

export function SquareMIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'square m'}
      {...hoverProps}
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <motion.path
        d="M8 16V8.5a.5.5 0 0 1 .9-.3l2.7 3.599a.5.5 0 0 0 .8 0l2.7-3.6a.5.5 0 0 1 .9.3V16"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.26, 0.42, 0.9], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'square-m',
  gesture: 'it draws itself',
  family: 'rigid' as const,
  section: 'Shapes',
  tags: ['square'],
}

export default SquareMIcon
