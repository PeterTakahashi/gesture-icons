import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, pen, settleBack } from '../core/easings'

/**
 * Shapes — it draws itself. There are no connector lines in this glyph, so
 * each shape draws itself in turn — triangle, then square, then circle —
 * erasing fast and pen-redrawing on its own beat, popping softly the
 * instant its own stroke completes, git-branch.tsx's language applied to
 * three independent shapes instead of one line.
 * Base geometry: Lucide `shapes` (ISC).
 */
const DUR = 1.0

function shape(delay: number): { path: Variants; pop: Variants } {
  return {
    path: {
      normal: { pathLength: 1 },
      animate: {
        pathLength: [1, 0.001, 0.001, 1],
        transition: { duration: DUR, delay, times: [0, 0.18, 0.3, 0.62], ease: [easeInCubic, 'linear', pen] },
      },
    },
    pop: {
      normal: { scale: 1 },
      animate: {
        scale: [1, 1, 1.15, 1],
        transition: { duration: DUR, delay, times: [0, 0.6, 0.75, 0.92], ease: ['linear', settleBack, 'easeOut'] },
      },
    },
  }
}

export function ShapesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const triangle = shape(0)
  const square = shape(0.15)
  const circle = shape(0.3)
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'shapes'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12.2px 6.2px' }}
        initial="normal"
        animate={controls}
        variants={triangle.pop}
      >
        <motion.path
          d="M8.3 10a.7.7 0 0 1-.626-1.079L11.4 3a.7.7 0 0 1 1.198-.043L16.3 8.9a.7.7 0 0 1-.572 1.1Z"
          initial="normal"
          animate={controls}
          variants={triangle.path}
        />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '6.5px 17.5px' }}
        initial="normal"
        animate={controls}
        variants={square.pop}
      >
        <motion.rect x="3" y="14" width="7" height="7" rx="1" initial="normal" animate={controls} variants={square.path} />
      </motion.g>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '17.5px 17.5px' }}
        initial="normal"
        animate={controls}
        variants={circle.pop}
      >
        <motion.circle cx="17.5" cy="17.5" r="3.5" initial="normal" animate={controls} variants={circle.path} />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'shapes',
  gesture: 'it draws itself',
  family: 'draw-on' as const,
  section: 'Shapes',
  tags: ['nodes', 'structure', 'shapes'],
}

export default ShapesIcon
