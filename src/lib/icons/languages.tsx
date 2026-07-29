import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, settleBack } from '../core/easings'

/**
 * Languages — it translates. The two letterforms trade emphasis: the left
 * mark stamps forward while the right mark dips back, then they reverse —
 * the same word, said twice.
 * Base geometry: Lucide `languages` (ISC).
 */
const DUR = 1.2

export function LanguagesIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'languages'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.9, 1.15, 1, 0.96, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.28, 0.5, 0.62, 1], ease: [easeInCubic, settleBack, easeInOutCubic, easeInOutCubic, easeInOutCubic] },
          },
        }}
      >
        <path d="m5 8 6 6" />
        <path d="m4 14 6-6 2-3" />
        <path d="M2 5h12" />
        <path d="M7 2h1" />
      </motion.g>
      <motion.g
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 0.96, 1, 0.9, 1.15, 1],
            transition: { duration: DUR, times: [0, 0.12, 0.5, 0.62, 0.78, 1], ease: [easeInOutCubic, easeInOutCubic, easeInCubic, settleBack, easeInOutCubic] },
          },
        }}
      >
        <path d="m22 22-5-10-5 10" />
        <path d="M14 18h6" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'languages',
  gesture: 'it translates',
  family: 'rigid' as const,
  section: 'Text & editing',
  tags: ['translate', 'i18n', 'locale', 'languages'],
}

export default LanguagesIcon
