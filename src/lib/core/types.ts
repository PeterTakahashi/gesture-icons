import type { CSSProperties } from 'react'
import type { GestureHandle, GestureTrigger } from './useGesture'

export interface GestureIconProps {
  /** Rendered size in px (icons are drawn on a 24-unit grid). */
  size?: number
  /** Stroke/fill color. Defaults to currentColor. */
  color?: string
  strokeWidth?: number
  trigger?: GestureTrigger
  className?: string
  style?: CSSProperties
  /** Imperative control: handleRef.current.play() */
  handleRef?: React.Ref<GestureHandle>
  'aria-label'?: string
}

/** Standard props forwarded to every icon's root <svg>. */
export const svgDefaults = {
  xmlns: 'http://www.w3.org/2000/svg',
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
} as const
