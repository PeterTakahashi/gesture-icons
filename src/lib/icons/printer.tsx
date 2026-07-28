import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { easeInOutCubic, easeOutQuart, gravity } from '../core/easings'

/**
 * Printer — it prints a page. A sheet rests hidden inside the body above
 * the output slot (y=14) behind a clipPath, slides down 4 units to emerge
 * onto the tray and holds there — printed — then is put back above the
 * slot in one quick move while still under the clip, like `folder.tsx`.
 * The body hums a hair on its feet while it works.
 * Base geometry: Lucide `printer` (ISC).
 */
const DUR = 1.1

export function PrinterIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  return (
    <svg
      {...svgDefaults} width={size} height={size} stroke={color} strokeWidth={strokeWidth}
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'printer'}
      {...hoverProps}
    >
      <defs>
        {/* only the output tray area (y >= 14) is visible — the page hides above it, inside the body */}
        <clipPath id="gi-printer-clip">
          <rect x="0" y="14" width="24" height="12" />
        </clipPath>
      </defs>
      <motion.g
        initial="normal"
        animate={controls}
        variants={{
          normal: { x: 0 },
          animate: {
            x: [0, -0.3, 0.3, -0.15, 0],
            transition: { duration: DUR, times: [0, 0.42, 0.56, 0.7, 0.82], ease: easeInOutCubic },
          },
        }}
      >
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
        <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6" />
        <rect x="6" y="14" width="12" height="8" rx="1" />
        {/* the page: hidden above the slot at rest, revealed as it crosses y=14 */}
        <motion.rect
          x="8" y="10" width="8" height="3" rx="0.5"
          clipPath="url(#gi-printer-clip)"
          initial="normal"
          animate={controls}
          variants={{
            normal: { y: 10 },
            animate: {
              y: [10, 10, 14, 14, 10],
              transition: {
                duration: DUR,
                times: [0, 0.24, 0.5, 0.72, 0.73],
                ease: ['linear', gravity, 'linear', easeOutQuart],
              },
            },
          }}
        />
      </motion.g>
    </svg>
  )
}

export const meta = {
  name: 'printer',
  gesture: 'it prints a page',
  family: 'secondary' as const,
  section: 'Devices',
  tags: ['print', 'paper'],
}

export default PrinterIcon
