/**
 * Composable for consistent entry animations across the site
 * Provides a reusable blur-fade animation pattern
 */

export interface EntryAnimationOptions {
  delay?: number
  duration?: number
  scale?: number
  blur?: string
}

export function useEntryAnimation(options: EntryAnimationOptions = {}) {
  const {
    delay = 0.1,
    duration = 0.6,
    scale = 1.1,
    blur = '20px'
  } = options

  return {
    initial: {
      scale,
      opacity: 0,
      filter: `blur(${blur})`
    },
    animate: {
      scale: 1,
      opacity: 1,
      filter: 'blur(0px)'
    },
    transition: {
      duration,
      delay
    }
  }
}
