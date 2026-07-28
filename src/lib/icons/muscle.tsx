import { motion } from 'motion/react'
import { useGesture } from '../core/useGesture'
import { svgDefaults, type GestureIconProps } from '../core/types'
import { pen, windupOvershoot } from '../core/easings'

/**
 * Muscle — the arm flexes. A hand does not slide or spin: it changes shape.
 * True vector morph: the arm drawn twice — relaxed and flexed — with the
 * same commands in the same order, so every point walks to its opposite
 * number. The wind-up curve (y1 < 0) sags the arm a hair before the drive,
 * and y2 > 1 carries the flex past its peak before it settles — both are
 * the path extrapolated outside its two poses.
 * 力こぶの折り目はペンで書き足され、緩む時に一拍遅れて消える。
 *
 * Pose drawings adapted from Bakai Tolondu uulu's "Animating icons"
 * (bakai.me/lab/animating-icons — shared by the author for reuse).
 * Drawn on a 96-grid; timing re-authored for Motion.
 */
const DUR = 0.85
const FLEX_IN = windupOvershoot                    // sag → drive → past the peak
const RELEASE: [number, number, number, number] = [0.36, 0, 0.3, 1.16] // let go, droop past rest, land

const ARM_REST =
  'M8.07169 81.2204C12.5862 87.6784 32.2377 92.7484 41.5188 80.658C51.5576 85.4596 68.1156 83.9712 81.5964 76.4536C83.4712 75.4084 85.2448 74.0888 86.3308 72.2372C88.7828 68.0572 88.8408 62.2576 84.3676 53.7004C76.9096 35.0829 63.496 18.7405 58.0804 12.1685C56.9684 11.1546 49.8748 9.71471 45.5488 8.33115C43.638 7.73907 40.08 7.34655 35.8245 12.9545C33.807 15.6131 24.6424 22.1428 36.2707 26.5338C38.0722 26.9922 39.3965 27.8375 47.6152 26.3361C48.6856 26.1504 51.358 26.3361 53.2412 29.6416L57.1744 35.2665C57.5404 35.7901 57.778 36.3925 57.8508 37.0273C58.54 43.0228 58.5176 50.5292 61.8604 54.3304C56.6972 50.5968 43.2044 46.1624 33.038 58.7804'
const ARM_FLEX =
  'M8.064 81.213C12.579 87.671 32.23 92.741 41.511 80.65C51.55 85.452 68.108 83.964 81.589 76.446C83.464 75.401 93.464 65.77 94.008 63.694C95.236 59.006 95.123 52.526 88.5 45.5C77.418 26.9502 57.74 17.9118 50.546 13.5198C49.201 12.8449 41.983 13.3798 37.444 13.2194C35.444 13.1669 31.913 13.7525 29.335 20.3033C28.113 23.4089 21.059 32.1764 33.442 33.2544C35.3 33.2079 36.804 33.663 44.309 29.9921C45.289 29.5234 47.912 28.9785 50.62 31.6505L55.929 36.0001C56.423 36.405 56.815 36.9206 57.057 37.512C56.444 43.66 72.705 60.166 65.602 53.083C59.445 46.942 48.967 43.221 40 51.5'

const CREASE_REST = 'M8.00757 51.76C12.8404 47.164 26.8479 39.9037 41.6716 50.0864'
const CREASE_FLEX = 'M8 51.752C12.793 43.153 25.628 34.9603 40.5 49.923'

// 隠す時は 1.02 — ちょうど 1 だと round cap が終点に点を残す
const CREASE2 = 'M16 62.427C18.163 68.357 35.755 70.019 40.5 65'

export function MuscleIcon({
  size = 24, color = 'currentColor', strokeWidth = 2,
  trigger, className, style, handleRef, ...rest
}: GestureIconProps) {
  const { controls, hoverProps } = useGesture({ trigger, handleRef })
  const morph = (restD: string, flexD: string) => ({
    normal: { d: restD },
    animate: {
      d: [restD, flexD, flexD, restD],
      transition: {
        duration: DUR,
        times: [0, 0.34, 0.6, 1],
        ease: [FLEX_IN, 'linear' as const, RELEASE],
      },
    },
  })
  return (
    <svg
      {...svgDefaults} viewBox="0 0 96 96" width={size} height={size}
      stroke={color} strokeWidth={strokeWidth * 3.25} overflow="visible"
      className={className} style={style} role="img" aria-label={rest['aria-label'] ?? 'muscle'}
      {...hoverProps}
    >
      <motion.path initial="normal" animate={controls} variants={morph(ARM_REST, ARM_FLEX)} d={ARM_REST} />
      <motion.path initial="normal" animate={controls} variants={morph(CREASE_REST, CREASE_FLEX)} d={CREASE_REST} />
      {/* the second fold is written on as the muscle bunches, un-written as it lets go */}
      <motion.path
        d={CREASE2}
        pathLength={1}
        strokeDasharray="1.02"
        initial="normal"
        animate={controls}
        variants={{
          normal: { strokeDashoffset: 1.02 },
          animate: {
            strokeDashoffset: [1.02, 1.02, 0, 0, 1.02, 1.02],
            transition: {
              duration: DUR,
              times: [0, 0.14, 0.32, 0.64, 0.8, 1],
              ease: ['linear', pen, 'linear', [0.5, 0, 0.8, 0.4], 'linear'],
            },
          },
        }}
      />
    </svg>
  )
}
