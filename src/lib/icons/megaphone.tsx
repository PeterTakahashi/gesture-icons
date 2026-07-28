import { motion, type Variants } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, pen } from '../core/easings'

/**
 * Megaphone — it announces. The whole body rears back about the narrow
 * end (the mouthpiece, not the bell), then thrusts forward on the shout;
 * two burst lines flick on at the wide mouth exactly on the thrust and
 * erase right after — drawn by stroke length, never a fade.
 * Base geometry: Lucide `megaphone` (ISC).
 */
const DUR = 0.95

export function MegaphoneIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const burst = (delay: number): Variants => ({
    normal: { strokeDashoffset: 1.02 },
    animate: {
      strokeDashoffset: [1.02, 1.02, 0, 0, 1.02, 1.02],
      transition: {
        duration: DUR,
        delay,
        times: [0, 0.44, 0.56, 0.68, 0.8, 0.92],
        ease: ['linear', pen, 'linear', easeInOutCubic, 'linear'],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'megaphone'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '8px 10px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { rotate: 0 },
          animate: {
            rotate: [0, -7, 5, -1, 0],
            transition: { duration: DUR, times: [0, 0.28, 0.56, 0.8, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M11 6a13 13 0 0 0 8.4-2.8A1 1 0 0 1 21 4v12a1 1 0 0 1-1.6.8A13 13 0 0 0 11 14H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2z" />
        <path d="M6 14a12 12 0 0 0 2.4 7.2 2 2 0 0 0 3.2-2.4A8 8 0 0 1 10 14" />
        <path d="M8 6v8" />
      </motion.g>
      {/* shout: hidden at rest, flicks on at the wide mouth on the thrust */}
      <motion.path
        d="M21.5 7.3l2.3-1.1"
        pathLength={1}
        strokeDasharray="1.02"
        strokeWidth={strokeWidth * 0.85}
        initial="normal"
        animate={controls}
        variants={burst(0)}
      />
      <motion.path
        d="M21.5 12.7l2.3 1.1"
        pathLength={1}
        strokeDasharray="1.02"
        strokeWidth={strokeWidth * 0.85}
        initial="normal"
        animate={controls}
        variants={burst(0.03)}
      />
    </svg>
  )
}

export const meta = {
  name: 'megaphone',
  gesture: 'it announces',
  family: 'rigid' as const,
  section: 'Communication',
  tags: ['announce', 'broadcast', 'shout', 'marketing'],
}

export default MegaphoneIcon
