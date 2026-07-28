import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutExpo } from '../core/easings'

/**
 * Ambulance — VARIANT(car), but urgent. The same rev-and-surge language as
 * car.tsx, faster and with a longer surge (+2.5 vs +2.6 at a hurried pace):
 * a suspension dip (the rev), then the whole body surges forward, hinged
 * about the rear wheel. Speed lines stream on behind it while it moves.
 * Base geometry: Lucide `ambulance` (ISC).
 */
const DUR = 0.85

export function AmbulanceIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'ambulance'}
      {...hoverProps}
    >
      <motion.g
        style={{ transformBox: 'view-box', transformOrigin: '7px 18px' }}
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0, y: 0 },
          animate: {
            y: [0, 1.1, 0, 0, 0],
            x: [0, 0, 0, 2.5, 0],
            transition: { duration: DUR, times: [0, 0.13, 0.26, 0.6, 1], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M10 10H6" />
        <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
        <path d="M19 18h2a1 1 0 0 0 1-1v-3.28a1 1 0 0 0-.684-.948l-1.923-.641a1 1 0 0 1-.578-.502l-1.539-3.076A1 1 0 0 0 16.382 8H14" />
        <path d="M8 8v4" />
        <path d="M9 18h6" />
        <circle cx="17" cy="18" r="2" />
        <circle cx="7" cy="18" r="2" />
      </motion.g>
      {/* speed lines: written on by length while it hurries, erased after */}
      {[{ d: 'M0 11h3', delay: 0 }, { d: 'M-1 15h2.6', delay: 0.05 }].map((l) => (
        <motion.path
          key={l.d}
          d={l.d}
          strokeWidth={strokeWidth * 0.75}
          initial="normal"
          animate={controls}
          variants={{
            normal: { pathLength: 0.001, opacity: 0 },
            animate: {
              pathLength: [0.001, 0.001, 1, 1, 0.001, 0.001],
              opacity: [0, 0, 1, 1, 0, 0],
              transition: {
                duration: DUR,
                delay: l.delay,
                pathLength: { times: [0, 0.22, 0.36, 0.56, 0.72, 1], ease: ['linear', easeOutExpo, 'linear', easeInOutCubic, 'linear'] },
                opacity: { times: [0, 0.21, 0.22, 0.71, 0.72, 1], ease: 'linear' },
              },
            },
          }}
        />
      ))}
    </svg>
  )
}

export const meta = {
  name: 'ambulance',
  gesture: 'it hurries past',
  family: 'rigid' as const,
  section: 'Health',
  tags: ['emergency', 'hospital'],
}

export default AmbulanceIcon
