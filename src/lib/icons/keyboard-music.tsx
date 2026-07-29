import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeOutQuart, settleBack } from '../core/easings'

/**
 * Keyboard music — a chord lands. The three key marks along the top row
 * press down together and spring back as one, in sync since a chord is
 * struck at once, not staggered — one chord, frame still.
 * Base geometry: Lucide `keyboard-music` (ISC).
 */
const DUR = 0.7

export function KeyboardMusicIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const press = {
    normal: { scale: 1 },
    animate: {
      scale: [1, 0.7, 1.1, 1],
      transition: { duration: DUR, times: [0, 0.3, 0.62, 1], ease: [easeInCubic, settleBack, easeOutQuart] },
    },
  }
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'keyboard music'}
      {...hoverProps}
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <motion.path
        d="M6 8h4"
        style={{ transformBox: 'view-box', transformOrigin: '8px 8px' }}
        initial="normal"
        animate={controls}
        variants={press}
      />
      <motion.path
        d="M14 8h.01"
        style={{ transformBox: 'view-box', transformOrigin: '14px 8px' }}
        initial="normal"
        animate={controls}
        variants={press}
      />
      <motion.path
        d="M18 8h.01"
        style={{ transformBox: 'view-box', transformOrigin: '18px 8px' }}
        initial="normal"
        animate={controls}
        variants={press}
      />
      <path d="M2 12h20" />
      <path d="M6 12v4" />
      <path d="M10 12v4" />
      <path d="M14 12v4" />
      <path d="M18 12v4" />
    </svg>
  )
}

export const meta = {
  name: 'keyboard-music',
  gesture: 'a chord lands',
  family: 'secondary' as const,
  section: 'Media',
  tags: ['piano', 'midi', 'keys', 'keyboard', 'music'],
}

export default KeyboardMusicIcon
