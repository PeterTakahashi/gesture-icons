import { useAnimationControls, useReducedMotion } from 'motion/react'
import { useCallback, useEffect, useImperativeHandle, useRef } from 'react'
import type { Ref } from 'react'

export type GestureTrigger = 'hover' | 'mount' | 'manual'

export interface GestureHandle {
  /** Play the gesture once. Resolves when it has finished and returned to rest. */
  play: () => Promise<void>
}

export interface UseGestureOptions {
  trigger?: GestureTrigger
  /**
   * Hover-intent dwell in ms. The gesture is not a hover state — it is a discrete
   * event, so it waits a breath before it plays, and once playing it is never
   * cancelled mid-flight. Intent guards the start, completion guards the end.
   */
  dwell?: number
  handleRef?: Ref<GestureHandle>
}

/**
 * The trigger discipline shared by every icon:
 *
 *  - hover: pointer enter starts a short dwell timer; leaving during the dwell
 *    cancels the *start*, never a running gesture. A gesture that has begun
 *    always finishes — every "animate" variant is authored to end exactly on
 *    the resting picture, so completion IS the reset.
 *  - mount: plays once when the component appears.
 *  - manual: only plays via the imperative handle.
 *
 * prefers-reduced-motion turns every play into a no-op; the icon stays a
 * perfectly good static icon.
 */
export function useGesture({ trigger = 'hover', dwell = 110, handleRef }: UseGestureOptions = {}) {
  const controls = useAnimationControls()
  const reduced = useReducedMotion()
  const playing = useRef(false)
  const dwellTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const play = useCallback(async () => {
    if (playing.current || reduced) return
    playing.current = true
    try {
      await controls.start('animate')
      // The last keyframe of every part is its rest value, so this set() is
      // invisible — it just detaches the finished animation.
      controls.set('normal')
    } finally {
      playing.current = false
    }
  }, [controls, reduced])

  useImperativeHandle(handleRef, () => ({ play }), [play])

  useEffect(() => {
    if (trigger === 'mount') {
      const t = setTimeout(play, 200)
      return () => clearTimeout(t)
    }
  }, [trigger, play])

  const onPointerEnter = useCallback(() => {
    if (trigger !== 'hover') return
    dwellTimer.current = setTimeout(play, dwell)
  }, [trigger, dwell, play])

  const onPointerLeave = useCallback(() => {
    if (dwellTimer.current) {
      clearTimeout(dwellTimer.current)
      dwellTimer.current = null
    }
    // Deliberately no cancel here: a started gesture runs to completion.
  }, [])

  return {
    controls,
    play,
    hoverProps: trigger === 'hover' ? { onPointerEnter, onPointerLeave } : {},
  }
}
