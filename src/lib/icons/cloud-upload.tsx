import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart } from '../core/easings'

/**
 * Cloud upload — it ascends into the cloud. The arrow rises and is
 * genuinely swallowed: a clipPath fixed at the cloud's own belly line (the
 * arrow's resting top just grazes it, so nothing is clipped at rest) hides
 * everything that rises above that line, then the arrow is repositioned
 * below while off-frame and climbs back into place. The cloud takes a
 * small breath as it swallows.
 * Base geometry: Lucide `cloud-upload` (ISC).
 */
const DUR = 1.1

export function CloudUploadIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'cloud upload'}
      {...hoverProps}
    >
      <defs>
        <clipPath id="gi-cloud-upload-clip">
          <rect x="0" y="13" width="24" height="11" />
        </clipPath>
      </defs>
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 11px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { scale: 1 },
          animate: {
            scale: [1, 1.04, 1],
            transition: { duration: DUR, times: [0, 0.24, 0.5], ease: easeOutQuart },
          },
        }}
      >
        <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
      </motion.g>
      <motion.g
        clipPath="url(#gi-cloud-upload-clip)"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            // 雲の腹の線より上はクリップで隠れる — 見えない間に下へ再配置
            y: [0, -8, -8, 8, 8, 0],
            transition: {
              duration: DUR,
              times: [0, 0.28, 0.5, 0.5, 0.55, 1],
              ease: [easeInCubic, 'linear', 'linear', 'linear', easeOutQuart],
            },
          },
        }}
      >
        <path d="M12 13v8" />
        <path d="m8 17 4-4 4 4" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'cloud-upload',
  gesture: 'it ascends into the cloud',
  family: 'travel' as const,
  section: 'Workspace',
  tags: ['backup', 'sync', 'save', 'up'],
}

export default CloudUploadIcon
