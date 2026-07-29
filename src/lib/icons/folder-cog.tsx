import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, easeOutQuint } from '../core/easings'

/**
 * Folder cog — it configures itself. VARIANT(folder): the folder dips on
 * the frame the cog lands; the cog badge is 8-fold symmetric (a tooth every
 * 45°), so — as in `cog.tsx` — its one-tooth turn is a free landing: wind
 * up, overshoot past the mark, settle on 45°, which reads identical to 0°.
 * Base geometry: Lucide `folder-cog` (ISC).
 */
const DUR = 0.9

export function FolderCogIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'folder cog'}
      {...hoverProps}
    >
      <motion.path
        d="M10.3 20H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.98a2 2 0 0 1 1.69.9l.66 1.2A2 2 0 0 0 12 6h8a2 2 0 0 1 2 2v3.3"
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.6, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.55, 0.7, 0.85, 1], ease: ['linear', easeOutQuart, easeInOutCubic, easeOutQuart] },
          },
        }}
      />
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '18px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          // free landing: 45° reads identical to 0° on this 8-fold cog
          animate: {
            rotate: [0, -8, 50, 45],
            transition: { duration: DUR, times: [0, 0.18, 0.75, 1], ease: [easeInOutCubic, easeOutQuint, easeOutQuart] },
          },
        }}
      >
        <path d="m14.305 19.53.923-.382" />
        <path d="m15.228 16.852-.923-.383" />
        <path d="m16.852 15.228-.383-.923" />
        <path d="m16.852 20.772-.383.924" />
        <path d="m19.148 15.228.383-.923" />
        <path d="m19.53 21.696-.382-.924" />
        <path d="m20.772 16.852.924-.383" />
        <path d="m20.772 19.148.924.383" />
        <circle cx="18" cy="18" r="3" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'folder-cog',
  gesture: 'it configures itself',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['folder', 'cog'],
}

export default FolderCogIcon
