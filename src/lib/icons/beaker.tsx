import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart } from '../core/easings'

/**
 * Beaker — the reaction stirs. VARIANT(test-tube): the whole glass tips
 * about its own base with a small wind-up and one swirl past level; the
 * liquid line is nested in the same rotating group and counter-rotates
 * ~60% about its own center, the same trick as test-tube's clapper-style
 * liquid line, so it reads as staying level-ish while the glass tips.
 * Base geometry: Lucide `beaker` (ISC).
 */
const DUR = 1.0

export function BeakerIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'beaker'}
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
        <path d="M4.5 3h15" />
        <path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" />
        <motion.path
          d="M6 14h12"
          style={{ transformBox: 'view-box', transformOrigin: '12px 14px' }}
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
  name: 'beaker',
  gesture: 'the reaction stirs',
  family: 'rigid' as const,
  section: 'Workspace',
  tags: ['lab', 'chemistry', 'beaker'],
}

export default BeakerIcon
