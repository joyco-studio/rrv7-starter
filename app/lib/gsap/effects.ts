/**
 * Export here to agument types
 */
import gsap from 'gsap'
import { noop } from '@/lib/utils'
import { logger } from '@/utils/logger'

const getElement = (node: GSAPTweenTarget): Element | Element[] | null => {
  if (node instanceof HTMLElement || node instanceof SVGElement) {
    return node
  }

  if (typeof node === 'string') {
    return document.querySelector(node)
  }

  if (Array.isArray(node)) {
    return node.map(getElement).filter((elm): elm is Element => elm != null)
  }

  return null
}

const clipIn: GSAPEffect<{
  direction?: 'up' | 'down'
  duration?: number
  stagger?: number
  ease?: string
}> = {
  effect: (node, config) => {
    const log = logger('clipIn')

    if (node instanceof SVGElement) {
      throw new Error('SVGElement is not supported')
    }

    const elements = getElement(node)

    if (!elements) {
      log.warn(node, 'Element not found')
      return noop
    }

    const firstElement = Array.isArray(elements) ? elements[0] : elements
    const parentNode = firstElement.parentElement

    if (!parentNode) {
      log.warn(node, 'Parent element not found')
      return noop
    }

    gsap.set(parentNode, {
      overflow: 'hidden',
    })

    gsap.set([node], {
      yPercent: config?.direction === 'down' ? -100 : 100,
    })

    return gsap.to(node, {
      yPercent: 0,
      stagger: config?.stagger,
      duration: config?.duration,
      ease: config?.ease,
    })
  },
  defaults: {
    direction: 'down',
    duration: 0.5,
    stagger: 0.05,
    ease: 'sharpRise',
  },
  extendTimeline: true,
}

/**
 * Clip + Translate text out
 */
const clipOut: GSAPEffect<{
  direction?: 'up' | 'down'
  duration?: number
  stagger?: number
  ease?: string
}> = {
  effect: (node, config) => {
    const log = logger('clipOut')

    if (node instanceof SVGElement) {
      throw new Error('SVGElement is not supported')
    }

    const elements = getElement(node)

    if (!elements) {
      log.warn(node, 'Element not found')
      return noop
    }

    const firstElement = Array.isArray(elements) ? elements[0] : elements
    const parentNode = firstElement.parentElement

    if (!parentNode) {
      log.warn(node, 'Parent element not found')
      return noop
    }

    gsap.set(parentNode, {
      overflow: 'hidden',
    })

    return gsap.to(node, {
      yPercent: config?.direction === 'down' ? 100 : -100,
      stagger: config?.stagger,
      duration: config?.duration,
      ease: config?.ease,
    })
  },
  defaults: {
    direction: 'down',
    duration: 0.5,
    stagger: 0.05,
    ease: 'sharpRise',
  },
  extendTimeline: true,
}

export const effects = {
  clipIn,
  clipOut,
} as const satisfies Record<string, GSAPEffect>

export const registerEffects = (gsap: GSAP) => {
  Object.entries(effects).forEach(([key, effect]) => {
    gsap.registerEffect({
      name: key,
      effect: effect.effect,
      defaults: effect.defaults,
      extendTimeline: effect.extendTimeline,
    })
  })
}
