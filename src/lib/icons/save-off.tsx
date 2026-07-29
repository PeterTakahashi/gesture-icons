import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInCubic, easeInOutCubic, easeOutQuart, pen } from '../core/easings'

/**
 * Save off — it is switched off. The slash erases then pen-redraws itself,
 * the same beat as eye-off.tsx, while the disk gives one small defeated
 * sag-and-tilt (a couple of units) and straightens back up. The source
 * geometry includes a stray curve entirely outside the 24x24 viewBox
 * (`M29.5 11.5s5 5 4 5`) — it is kept verbatim and left un-animated since it
 * is invisible at rest and stays that way.
 * Base geometry: Lucide `save-off` (ISC).
 */
const DUR = 0.95

export function SaveOffIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'save off'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '12px 12px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0, rotate: 0 },
          animate: {
            y: [0, 2.6, 2.6, 0],
            rotate: [0, 3, 3, 0],
            transition: { duration: DUR, times: [0, 0.4, 0.62, 0.92], ease: [easeInOutCubic, 'linear', easeOutQuart] },
          },
        }}
      >
        <path d="M13 13H8a1 1 0 0 0-1 1v7" />
        <path d="M14 8h1" />
        <path d="M17 21v-4" />
        <path d="M20.41 20.41A2 2 0 0 1 19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 .59-1.41" />
        <path d="M29.5 11.5s5 5 4 5" />
        <path d="M9 3h6.2a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V15" />
      </motion.g>
      <motion.path
        d="m2 2 20 20"
        initial="normal"
        animate={controls}
        variants={{
          normal: { pathLength: 1 },
          animate: {
            pathLength: [1, 0.001, 0.001, 1],
            transition: { duration: DUR, times: [0, 0.25, 0.4, 0.8], ease: [easeInCubic, 'linear', pen] },
          },
        }}
      />
    </svg>
  )
}

export const meta = {
  name: 'save-off',
  gesture: 'it is switched off',
  family: 'draw-on' as const,
  section: 'Files & time',
  tags: ['disabled', 'off', 'save'],
}

export default SaveOffIcon
