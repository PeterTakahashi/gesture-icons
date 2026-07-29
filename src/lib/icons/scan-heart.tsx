import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuint } from '../core/easings'

/**
 * Scan heart — it is loved. VARIANT(heart): a compact lub-dub scale about
 * the heart's own center while the four scan brackets hold still.
 * Base geometry: Lucide `scan-heart` (ISC).
 */
const DUR = 0.8

export function ScanHeartIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'scan heart'}
      {...hoverProps}
    >
      <path d="M17 3h2a2 2 0 0 1 2 2v2" />
      <path d="M21 17v2a2 2 0 0 1-2 2h-2" />
      <path d="M3 7V5a2 2 0 0 1 2-2h2" />
      <path d="M7 21H5a2 2 0 0 1-2-2v-2" />
      <motion.path
        d="M7.828 13.07A3 3 0 0 1 12 8.764a3 3 0 1 1 4.172 4.306l-3.447 3.62a1 1 0 0 1-1.449 0z"
        style={{ transformBox: 'view-box', transformOrigin: '12px 12.85px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.1, 1.02, 1.18, 0.99, 1],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.3, 0.46, 0.66, 1],
              ease: [easeOutQuint, easeInOutCubic, easeOutQuint, easeInOutCubic, easeInOutCubic],
            },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'scan-heart',
  gesture: 'it is loved',
  family: 'rigid' as const,
  section: 'Security',
  tags: ['favorite', 'love', 'scan', 'heart'],
}

export default ScanHeartIcon
