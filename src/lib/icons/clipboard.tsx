import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeOutQuart } from '../core/easings'

/**
 * Clipboard — there is no content mark to perform its own verb here, so the
 * board itself carries the whole gesture: a soft settling dip, like a hand
 * setting it down, that lands and returns exactly on the resting picture.
 * Base geometry: Lucide `clipboard` (ISC).
 */
const DUR = 0.8

export function ClipboardIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'clipboard'}
      {...hoverProps}
    >
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { y: 0 },
          animate: {
            y: [0, 0, 0.8, 0],
            transition: { duration: DUR, times: [0, 0.6, 0.78, 1], ease: ['linear', easeOutQuart, easeOutQuart] },
          },
        }}
      >
        <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
        <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'clipboard',
  gesture: 'it does what it means',
  family: 'rigid' as const,
  section: 'Files & time',
  tags: ['clipboard', 'tasks'],
}

export default ClipboardIcon
