import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Test tube — the sample reacts. The whole tube tips about its own base
 * (12px,21px, the rounded foot the tube would stand on) with a small
 * wind-up, a swirl past level, and a settle. The liquid line is nested
 * inside the same rotating group and counter-rotates 60% about its own
 * center — the same trick as bell.tsx's counter-swinging clapper — so it
 * reads as staying level-ish while the glass tips around it.
 * Base geometry: Lucide `test-tube` (ISC).
 */
const DUR = 1.0

export function TestTubeIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'test tube'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 21px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -8, 4, 0],
            transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
          },
        }}
      >
        <path d="M14.5 2v17.5c0 1.4-1.1 2.5-2.5 2.5c-1.4 0-2.5-1.1-2.5-2.5V2" />
        <path d="M8.5 2h7" />
        <motion.path
          d="M14.5 16h-5"
          style={{ transformBox: 'view-box', transformOrigin: '12px 16px' }}
          initial="normal"
          animate={controls}
          variants={{
            normal: { rotate: 0 },
            animate: {
              rotate: [0, 4.8, -2.4, 0],
              transition: { duration: DUR, times: [0, 0.35, 0.7, 1], ease: [easeInOutCubic, easeOutQuart, easeInOutCubic] },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'test-tube',
  gesture: 'the sample reacts',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['lab', 'experiment', 'science'],
}

export default TestTubeIcon
